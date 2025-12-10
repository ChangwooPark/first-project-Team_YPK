# [スケジュール登録アプリ] 

> **スケジュール登録アプリを作成することによって、projectの基本的な流れを勉強する**

## プロジェクト概要

このプロジェクトは、スケジュール登録アプリを作成することでprojectの企画からDeployまでの流れを勉強するプロジェクトである。


### 目的

1.  **GitHub:** GitHubの利用スキルを身につける
2.  **Document:** 要件定義、設計書などの文書化作業の経験を身につける
3.  **program languege:** TypeScript, NextJsの開発経験を身につける
4.  **AI:** AI活用スキルを身につける　(※未定)
5.  **Deploy:** Deploy経験を身につける

### 主要機能 

* スケジュールの作成、編集、削除（CRUD機能）
* スケジュールの期限、担当者、カテゴリ別フィルタリング
* AI/ロジックによるタスクの緊急度スコアリング（High / Middle / Low）(※未定)
* 期限が迫ったタスクに対する自動通知機能
* 進捗状況（ToDo / In Progress / Done）のボード表示（カンバン形式）

## 技術スタック (Tech Stack)

このプロジェクトは、以下の技術と環境で構築されています。

| 分野 | 技術名 | 役割 |
| :--- | :--- | :--- |
| **フロントエンド** | Next.js | SPA(シングルページアプリケーション)による高速なUI/UX構築　(※未定) |
| **バックエンド** | Node.js TypeScript | タスク管理ロジック、APIエンドポイント設計 |
| **データベース** | MySQL | タスクデータ、ユーザー情報の永続化 |
| **環境** | Git, GitHub | バージョン管理、チームメンバーとのコード共有 |

## 実行環境とインストール

### 1. 必要条件

* Node.js (v18.x 以上)
* npm
* Git
* MySQL

### 2. インストール手順

まず、リポジトリをクローンし、必要な依存関係をインストールします。

```bash
# 1. リポジトリをローカルにクローン
git clone [リポジトリのHTTPSアドレス]

# 2. プロジェクトディレクトリに移動
cd [リポジトリ名]

# 3. 依存関係をインストール
npm install  # (Node.jsの場合)
```

### 3. 環境設定ファイル (.env)

ローカルでDB接続やAPIキーなどの機密情報を設定するため、プロジェクトのルートに .env ファイルを作成してください。
**[※ .envのファイル構成を修正した場合には .env.example　にその内容を更新する]**

```bash
# .env ファイルの例
DB_HOST=localhost:27017
DB_NAME=task_manager_db
PORT=3000
```

### 4. 起動方法
> ** 以下の処理はプロジェクトルートフォルダーを基準とします。　**

1. 依存性(Dependency) Package　install
* Backend Dependency install

```bash
# CloneしたプロジェクトのFolderまで移動後
cd ./backend
npm install
```

* Frontend Dependency install

```bash
# CloneしたプロジェクトのFolderまで移動後
cd ./frontend
npm install
```

2. 環境変数ファイルの準備
* Backend .env setup
 * 中身は .env.exampleに合わせる

```bash
# CloneしたプロジェクトのFolderまで移動後
cd ./backend
touch .env # macOS/Linux
type nul > .env # Window CMD
```

* Frontend .env setup
 * 中身は .env.exampleに合わせる

```bash
# CloneしたプロジェクトのFolderまで移動後
cd ./frontend
touch .env # macOS/Linux
type nul > .env # Window CMD
```

3. プロジェクト実行方法
* Backendサーバー起動

```bash
cd ./backend

# サーバー起動 (nodemon使用)
npm run dev
```

* Frontend App 起動
```bash
cd ./frontend

# サーバー起動 (nodemon使用)
npm run dev
```

## 貢献者

このプロジェクトは以下のメンバーによって貢献・開発されました。

| 指名 | GitHub ID | 担当 |
| :--- | :--- | :--- |
| **朴** | pcwjapan@gmail.com | (※未定) |
| **山田** | yamatatsu-gh | (※未定) |
| **兼子** | - | (※未定) |

## ブランチ戦略とルール

* メインブランチ: main (安定板を維持)
* 開発用ブランチ: develop (最新の開発版)
* 機能ブランチ: feature/機能名 (個人作業用。作業終了後、developへPRを出す)
* コミットメッセージ: プレフィックス (feat:, fix:, docs:) を必ず使用してください。

## push test