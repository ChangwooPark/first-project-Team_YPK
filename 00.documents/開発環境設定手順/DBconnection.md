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

`backend/.env` に以下の内容を作成してください。 (値は利用者のMySQL設定に合わせるように設定)

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

TypeORMはDB Connection 情報を集めた設定ファイルが必要です。 `backend/src` フォルダーの中に新しいファイル **data-source.ts**を作成して以下のように内容を作成します。

このファイルは .envから読み取った情報をベースとしてDB Connectionを初期化する役割をします。


```bash
// backend/src/data-source.ts


import 'reflect-metadata';
import { DataSource } from 'typeorm';

// .env ファイルを読み取るためのdotenv設定
import * as dotenv from 'dotenv';
dotenv.config();

// TypeORMが利用するDB Connection情報 (DataSource)定義
export const AppDataSource = new DataSource({
    // 1. 利用する DB Type
    type: "mysql",
    
    // 2. Connection情報 (.env)
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    // 3. Entity ファイルの場所
    // **Path**: プロジェクトRoot(backend)基準で'src/entity/'フォルダーの中にある全ての.tsファイルを見つけ出します。
    entities: [__dirname + "/entity/*.ts"],

    // 4. DB Connectionの際、Scheme自動生成と同期 (Dev環境で使用、 Deployの際にはfalse)
    synchronize: true, 
    logging: false,
});

```

## 4. Entity (Table)定義

実際にDB TableになるTypeScriptクラス, Entityを定義します。<br>
`backend/src`フォルダーの中に`entity`フォルターを作成し,その下に`User.ts`を作成します。

```bash
# backend から実行
cd src
mkdir entity
```
<br>

`backend/src/entity/User.ts`
```bash
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity() デコレーターはこのクラスがDBの 'user' テーブルと繋ぐことを意味
@Entity()
export class User {
    // @PrimaryGeneratedColumn: Primary Key、 値が自動でIncreamentする
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column: 'firstName' カラムを生成 
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;
}
```
<br>


[※]上記の設定でコードにエラーが発生する場合、`tsconfig.json`にデコレーターの設定をONにする必要がある
```bash
{
  "compilerOptions": {
    // ... 他の設定 ...
    
    // 1. デコレーター文法利用を許可 (必須)
    "experimentalDecorators": true, 
    
    // 2. デコレーターがType情報をデザインタイムにImportすることを許可 (TypeORMに必須)
    "emitDecoratorMetadata": true, 

    // ... 他の設定 ...
  }
  // ...
}

```
<br>

## 5. サーバー　スタート時点にDB Connection統合 (index.ts)
<br>

サーバーのスタートファイルである`index.ts`を修正し、サーバーがRequestをもらう前にDB Connectionを試すようにします。<br>
`backend/src/index.ts`を以下のように修正します。

```bash
import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source'; // TypeORM DataSoureのインポート

// .envファイルを読んで環境変数設定
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(cors()); // Backendサーバーが他のOriginからのRequestも許可するmiddle ware（設定しないとFrontサーバーからのAPI Rquestを拒否してしまう）
app.use(express.json()); //　Clientからサーバーに転送されたJson形式のデータをObjectにParsingしてくれるmiddle ware

const PORT = process.env.PORT || 4000;

// DB Connection及びサーバー起動関数
const initalizeServer = async () => {
  try{
    // Try DB Connection
    await AppDataSource.initialize()
    console.log(`[O] Data Sourceの初期化に成功。`)

    // DB Connection成功後、Expressサーバー起動
    app.listen(PORT, () =>{
      console.log(`[O] サーバー起動中... http://localhost:${PORT}`)
    })

  }catch(error){
    // DB connection失敗時のエラーログ
    console.error("[X] Data Source初期化でエラー発生 :", error)
    process.exit(1) // 0: プロセス成功, 1: プロセスエラー　[※]自動化ScriptやCI/CDファイフラインで重要
  }
}

// サーバー初期化関数実行
initalizeServer()

// テスト用　API Endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Backendサーバー起動中');
});
```

## 6. 実行と確認

以下コマンドでDevサーバーを実行すると動作結果を確認できる。
```bash
npm run dev
```

![実行結果](/Users/cw-park/Team_YPK/first-project-Team_YPK/00.documents/Images/DBconnection/DBconnection_1.png)