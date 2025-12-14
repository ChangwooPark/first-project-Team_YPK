 ## [データベース設計書 (DB設計書)] (JP)

 ### 1. 概要 (Overview)

| 項目 | 内容 |
| :--- | :--- |
| **プロジェクト名** | **タスク管理アプリケーション (Task Management App)** |
| **システム種別** | 協業ベースの業務チケット管理システム |
| **DB 種別** | **MySQL 8.0 以上推奨** (TypeORM 使用) |
| **バージョン** | **1.0.0 (初期設計)** |
| **設計目的** | **ユーザー、ワークスペース、業務チケットの安定的な管理と関係定義** |

---
### 2. エンティティ-関係ダイアグラム (ERD)

![ERD](../Images/DB設計書/ERD.png)

```mermaid
erDiagram
    User ||--o{ Workspace : created_by
    User ||--o{ WorkspaceMember : member_of
    Workspace }|--|| WorkspaceMember : has_member
    Workspace ||--o{ Ticket : belongs_to
    TicketStatus ||--o{ Ticket : has_status
    User ||--o{ Ticket : created_by
    User o|--o{ Ticket : assigned_to

    User {
        int id PK
        varchar userAccount "ログインアカウント名"
        varchar password "ハッシュ化パスワード"
        varchar firstName "名"
        varchar lastName "姓"
        datetime createdAt "作成日時"
        datetime updatedAt "更新日時"
    }

    Workspace {
        int id PK
        varchar name "ワークスペース名"
        text description "説明"
        int creatorId FK "作成者ID"
        datetime createdAt "作成日時"
        datetime updatedAt "更新日時"
    }

    WorkspaceMember {
        int userId PK,FK "ユーザーID"
        int workspaceId PK,FK "ワークスペースID"
        enum role "メンバーの役割"
    }

    TicketStatus {
        int id PK
        varchar name "状態名 (例: To Do, Done)"
        int orderIndex "表示順"
    }

    Ticket {
        int id PK
        varchar title "チケット名"
        text description "詳細説明"
        int workspaceId FK "ワークスペースID"
        int ticketStatusId FK "チケット状態ID"
        int creatorId FK "作成者ID"
        int assigneeId FK "担当者ID"
        enum priority "優先度"
        datetime dueDate "期日"
        datetime updatedAt "更新日時"
    }
```

---
### 3. テーブル定義詳細 (Detailed Table Definition)
> 各エンティティ(テーブル)の詳細定義は以下の通りです。

<br>

**3-1. User テーブル (ユーザー)**

| フィールド名(Column)| 型(Type) | 長さ(Size) | 制約条件 | 説明 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 固有ユーザー ID |
| **userAccount** | VARCHAR | 255 | NOT NULL, UNIQUE | ログインアカウント名(メールアドレス) |
| **password** | VARCHAR | 255 | NOT NULL| ハッシュ化されたパスワード |
| **firstName** | VARCHAR | 100 | NULLABLE | 名 |
| **lastName** | VARCHAR | 100 | NULLABLE | 姓 |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | アカウント作成日時 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 最終情報更新日時 |

<br>

**3-2. Workspace テーブル (ワークスペース)**

| フィールド名(Column)| 型(Type) | 長さ(Size) | 制約条件 | 説明 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 固有ワークスペース ID |
| **name** | VARCHAR | 255 | NOT NULL | ワークスペース名 |
| **description** | TEXT |  | NULABLE | ワークスペースの説明 |
| **creatorId** | Int |  | FK(User.id), NOT NULL | 作成者の固有ユーザー ID |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 作成日時 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 更新日時 |

<br>

**3-3. WorkspaceMember テーブル (ワークスペース メンバー)**

| フィールド名(Column)| 型(Type) | 長さ(Size) | 制約条件 | 説明 |
| :--- | :--- | :--- | :--- | :--- |
| **userId** | Int |  | PK, FK(User.id) | 固有ユーザー ID |
| **workspaceId** | Int |  | PK, FK(Workspace.id) | 固有ワークスペース ID |
| **role** | ENUM |  | NOT NULL | メンバーの役割 (例:'Member', 'Admin') |

<br>

**3-4. TicketStatus テーブル (現在のチケット進行状態)**

| フィールド名(Column)| 型(Type) | 長さ(Size) | 制約条件 | 説明 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increment | 固有チケット状態 ID |
| **name** | VARCHAR | 50 | NOT NULL, UNIQUE | 状態名 (例: To Do, Done) |
| **orderIndex** | Int |  | NOT NULL | 表示順 |

<br>

**3-5. Ticket テーブル (業務チケット)**

| フィールド名(Column)| 型(Type) | 長さ(Size) | 制약条件 | 説明 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 固有チケット ID |
| **title** | VARCHAR | 255 | NOT NULL | チケット名 |
| **description** | TEXT |  | NULABLE | チケットの詳細説明 |
| **workspaceId** | Int |  | FK(Workspace.id), NOT NULL | 固有ワークスペース ID |
| **ticketStatusId** | Int |  | FK(TicketStatus.id), NOT NULL| 固有現在のチケット進行状態 ID |
| **creatorId** | Int |  | FK(User.id), NOT NULL | 作成者の固有ユーザー ID |
| **assigneeId** | Int |  | NULLABLE | チケット担当者の固有ユーザー ID |
| **priority** | ENUM |  | NULABLE | 優先度 (例: high, middle...) |
| **dueDate** | DATETIME |  | NULABLE | 期日 |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 作成日時 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 更新日時 |

---
<br>
<br> 
 
 ## [DB 설계서] (KR)

 ### 1. 개요 (Overview)

 | 항목 | 내용 | 
| :--- | :--- |
| **프로젝트명** | **Task Management App** |
| **시스템 유형** | 협업 기반 업무 티켓 관리 시스템 |
| **DB 종류** | **MySQL 8.0 이상 권장** (TypeORM 사용) |
| **버전** | **1.0.0 (초기 설계)**  |
| **설계 목적** | **사용자, 워크스페이스, 업무 티켓의 안정적인 관리 및 관계 정의** |

---
### 2. 엔티티-관계 다이어그램 (ERD)

![ERD](../Images/DB設計書/ERD.png)

```mermaid
erDiagram
    User ||--o{ Workspace : created_by
    User ||--o{ WorkspaceMember : member_of
    Workspace }|--|| WorkspaceMember : has_member
    Workspace ||--o{ Ticket : belongs_to
    TicketStatus ||--o{ Ticket : has_status
    User ||--o{ Ticket : created_by
    User o|--o{ Ticket : assigned_to

    User {
        int id PK
        varchar userAccount "ログインアカウント名"
        varchar password "ハッシュ化パスワード"
        varchar firstName "名"
        varchar lastName "姓"
        datetime createdAt "作成日時"
        datetime updatedAt "更新日時"
    }

    Workspace {
        int id PK
        varchar name "ワークスペース名"
        text description "説明"
        int creatorId FK "作成者ID"
        datetime createdAt "作成日時"
        datetime updatedAt "更新日時"
    }

    WorkspaceMember {
        int userId PK,FK "ユーザーID"
        int workspaceId PK,FK "ワークスペースID"
        enum role "メンバーの役割"
    }

    TicketStatus {
        int id PK
        varchar name "状態名 (例: To Do, Done)"
        int orderIndex "表示順"
    }

    Ticket {
        int id PK
        varchar title "チケット名"
        text description "詳細説明"
        int workspaceId FK "ワークスペースID"
        int ticketStatusId FK "チケット状態ID"
        int creatorId FK "作成者ID"
        int assigneeId FK "担当者ID"
        enum priority "優先度"
        datetime dueDate "期日"
        datetime updatedAt "更新日時"
    }
```

---
### 3. 테이블 정의 상세 (Detailed Table Definition)
> 각 엔티티(테이블)에 대한 상세 정의는 다음과 같습니다.

<br>

**3-1. User 테이블 (사용자)**

 | 필드명(Column)| 타입(Type) | 길이(Size) | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 고유 사용자 ID |
| **userAccount** | VARCHAR | 255 | NOT NULL, UNIQUE | 로그인 계정명(이메일) |
| **password** | VARCHAR | 255 | NOT NULL| 해시된 비밀번호 |
| **firstName** | VARCHAR | 100 | NULLABLE | 이름 |
| **lastName** | VARCHAR | 100 | NULLABLE | 성 |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 계정 작성 일시 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 최종 정보 수정 일시 |

<br>

**3-2. Workspace 테이블 (워크스페이스)**

 | 필드명(Column)| 타입(Type) | 길이(Size) | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 고유 워크스페이스 ID |
| **name** | VARCHAR | 255 | NOT NULL | 워크스페이스 이름 |
| **description** | TEXT |  | NULABLE | 워크스페이스 설명 |
| **creatorId** | Int |  | FK(User.id), NOT NULL | 생성자의 고유 사용자 ID |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 생성 일시 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 수정 일시 |

<br>

**3-3. WorkspaceMember 테이블 (워크스페이스 멤버)**

 | 필드명(Column)| 타입(Type) | 길이(Size) | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **userId** | Int |  | PK, FK(User.id) | 고유 사용자 ID |
| **workspaceId** | Int |  | PK, FK(Workspace.id) | 고유 워크스페이스 ID |
| **role** | ENUM |  | NOT NULL | 멤버 역할 (예:'Member', 'Admin') |

<br>

**3-4. TicketStatus 테이블 (현재 티켓 진행 상태)**

 | 필드명(Column)| 타입(Type) | 길이(Size) | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increment | 고유 티켓 상태 ID |
| **name** | VARCHAR | 50 | NOT NULL, UNIQUE | 상태 이름 (예: To Do, Done) |
| **orderIndex** | Int |  | NOT NULL | 표시 순서 |

<br>

**3-5. Ticket 테이블 (업무 티켓)**

 | 필드명(Column)| 타입(Type) | 길이(Size) | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| **id** | Int |  | PK, Auto Increament | 고유 티켓 ID |
| **title** | VARCHAR | 255 | NOT NULL | 티켓명 |
| **description** | TEXT |  | NULABLE | 티켓 상세 설명 |
| **workspaceId** | Int |  | FK(Workspace.id), NOT NULL | 고유 워크스페이스 ID |
| **ticketStatusId** | Int |  | FK(TicketStatus.id), NOT NULL| 고유 현재 티켓 진행 상태 ID |
| **creatorId** | Int |  | FK(User.id), NOT NULL | 작성자 고유 사용자 ID |
| **assigneeId** | Int |  | NULLABLE | 티켓 담당자 고유 사용자 ID |
| **priority** | ENUM |  | NULABLE | 우선순위 (예: high, middle...) |
| **dueDate** | DATETIME |  | NULABLE | 마감일 |
| **createdAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 생성 일시 |
| **updatedAt** | DATETIME |  | NOT NULL, Default CURRENT_TIMESTAMP | 수정 일시 |

