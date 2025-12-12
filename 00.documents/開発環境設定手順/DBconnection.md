# [TypeScriptのDB連携]

## 1. 必要なPackage設置
backend フォルダーで以下のコマンドでTypeORMとMySQL Driver、TypeScriptの定義ファイルを設置します。

```bash
# 1. TypeORM ライブラリーと MySQL Driver(mysql2) install
npm install typeorm mysql2

# 2. TypeScript タイプ定義ファイル install (-Dは開発用と言う意味)
npm install -D @types/node @types/express
```
[※]参考: typeormはORMロジックを, mysql2は Node.jsがMySQLサーバーと通信をできるようにするツールです。

## 2. 環境変数設定 (backend/.env)

backend/.env に以下の内容を作成してください。 (値は利用者のMySQL設定に合わせるように設定)

```bash
# ========================
# DB Setup (MySQL)
# ========================
DB_HOST=localhost       # またはMySQLが設置されてるサーバーのIP
DB_PORT=3306            # MySQL　Default Port
DB_USERNAME=root        # DB user name
DB_PASSWORD=your_password  # DB password
DB_DATABASE=my_awesome_db # 利用するDB名 (事前に作成しておく)

# サーバーPort
PORT=4000
```

## 3. TypeORM 設定ファイル作成 (data-source.ts)

TypeORM은 DB 연결 정보를 모아둔 설정 파일이 필요합니다. backend/src 폴더 안에 새로운 파일 **data-source.ts**를 생성하고 다음과 같이 작성합니다.

이 파일은 .env에서 읽어온 정보를 바탕으로 DB 연결을 초기화하는 역할을 합니다.