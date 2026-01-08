'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { authService, LoginRequest } from '@/services/auth.services'

export default function LoginPage(){
    const router = useRouter();

    // 入力値管理State
    const [userAccount, setUserAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //　Login Button　Click Handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // ページの更新防止
        setIsLoading(true);
        setError(null);

        try {
            // Backend API 呼び出し
            const loginData : LoginRequest = {userAccount, password}
            const response = await authService.login(loginData);
            
            const user = response.user
            const token = response.token
        
            // alert(`${user.firstName || user.userAccount}様 ようこそ!!`)

            // 検証用でダッシュボードに移動
            router.push(`/dashboard?id=${user.userAccount}&name=${user.firstName || ''}${user.lastName || ''}&token=${token}`)

        } catch (error: any) {
            // axiosエラーの処理
            const errorMsg = error.response?.data?.message || 'ログインに失敗しました。'
            setError(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        // 1. 全体画面のContainer （68px = Navbarの高さ） 
        <div className="flex min-h-[calc(100vh-68px)] w-full">
            {/* 2. 左の領域: 青の背景　*/}
            <div className="hidden lg:block w-2/5 bg-blue-50"></div>

            {/* 3. 右の領域: 白の背景　*/}
            <div className="w-full lg:w-3/5 bg-white flex flex-col items-center justify-center p-8">
                {/* Login Form */}
                <div className="w-full max-w-[450px] text-center">
                    <h1 className="text-4xl font-bold mb-8">サインイン</h1>
                    {/* 수정개시 */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* ID/Email 入力 */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="メールアドレス"
                                value={userAccount}
                                onChange={(e) => setUserAccount(e.target.value)}
                                className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-3 text-lg ${error ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'} `}
                            />
                        </div>

                        {/* Password 入力 */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="パスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-3 text-lg ${error ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'} `}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors duration-300 text-lg 
                                ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
                        >
                            {isLoading ? '通信中...' : 'サインイン'}
                        </button>

                        {/* 区切り線 */}
                        <div className="py-0">
                            <hr className="border-t border-black" />
                        </div>

                        {/* Signup Button */}
                        <Link href="/signup" className="w-full">
                            <button
                                type="button"
                                className="w-full py-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors duration-300 text-md"
                            >
                                会員登録
                            </button>
                        </Link>

                        {error && (
                            <div className="mt-4 p-2 text-red-600 text-sm font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </form>

                </div>

                {/* Footer */}
                <div className="absolute bottom-10 text-center">
                    <div className="flex justify-center space-x-3 text-blue-500 text-xs mb-2">
                        <button className="hover:underline">ヘルプ</button>
                        <button className="hover:underline">規約</button>
                        <button className="hover:underline">プライバシー</button>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        YPK_TaskAppは開発の勉強のため<br />
                        作成したWebAppです。
                    </p>
                </div>

                {/* 4. 商品説明ボックス */}
                <div className="hidden lg:flex absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 mt-7 z-10">
                    <div className="w-[500px] h-[300px] bg-white border border-gray-300 shadow-xl flex items-center justify-center p-3">
                        {/* <p className="text-gray-700 font-bold text-xl text-center">
                            商品説明イメージ<br />
                            (例：ダッシュボードのイメージ)
                        </p> */}
                        <Image 
                            src="/DashBoard.png"   // public 폴더 내의 파일명
                            alt="Dashboard Preview"
                            width={500}             // 박스 너비에 맞춤
                            height={300}            // 박스 높이에 맞춤
                            className="object-cover w-full h-full" // 이미지가 박스에 꽉 차게 설정
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}