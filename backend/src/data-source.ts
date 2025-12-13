import 'reflect-metadata';
import { DataSource } from 'typeorm';

// .env ファイルを読み取るためのdotenv設定
import * as dotenv from 'dotenv';
dotenv.config();

// DB syncの設定を .envで管理する。
const isSynchronized = process.env.DB_SYNCHRONIZE === 'true';

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
    synchronize: isSynchronized, 
    logging: false,
});