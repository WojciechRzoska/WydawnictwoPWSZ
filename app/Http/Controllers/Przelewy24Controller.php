<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class Przelewy24Controller extends Controller
{
    public function registerToken(Request $request){
        $sessionId = Str::uuid();
        $amount = (int)$request->input('amount');
        $description = $request->input('description');
        $email = $request->input('email');

        $signData = [
            'sessionId' => $sessionId,
            'merchantId' => 151177,
            'amount' => $amount,
            'currency' => 'PLN',
            'crc' => '9684270cad5e2b05'
        ];
        $sign = hash('sha384',json_encode($signData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));


        $paymentInfo = [
            'merchantId' => 151177,
            'posId' => 151177,
            'sessionId' => $sessionId,
            'currency' => 'PLN',
            'country' => 'PL',
            'description' => $description,
            'email' => $email,
            'urlReturn' => url('koniec-transakcji'),
            'urlStatus' =>  url('api/paymentVerify'),
            'amount' => $amount,
            'language' => 'pl',
            'sign' => $sign,
            'encoding' => 'UTF-8'

        ];

        $order = new Order();
        $order->sessionId = $sessionId;
        $order->amount = $amount;
        $order->save();

        $response = Http::withBasicAuth('151177','f2232650467d31719ed0fa588bf6dd64')
            ->post('https://sandbox.przelewy24.pl/api/v1/transaction/register', $paymentInfo);
        return $response;
    }

    public function paymentVerify(Request $request){
        var_dump($request);
        return null;
    }
}
