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
