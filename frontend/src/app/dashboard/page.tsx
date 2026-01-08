'use client';

import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    
    const email = searchParams.get('id');
    const name = searchParams.get('name');
    const token = searchParams.get('token');

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
                🏠 User Dashboard (仮)
            </h1>
            
            <div className="bg-white border-2 border-blue-100 p-8 rounded-3xl shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {name ? name[0] : '?'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{name}様, ようこそ!</h2>
                        <p className="text-gray-500">{email}</p>
                    </div>
                </div>

                <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-700">認証データ検証 (Backend Response)</h3>
                    <div className="overflow-x-auto">
                        <p className="text-sm font-mono break-all bg-white p-3 border rounded-lg">
                            <span className="text-blue-600 font-bold">Token:</span> {token}
                        </p>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => window.location.href = '/login'}
                className="mt-8 w-full py-3 border-2 border-gray-300 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
            >
                ログアウト
            </button>
        </div>
    );
}