<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{
    public function Login(Request $request){
        try{
            if(Auth::attempt($request->only('email','password','role'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => "Udane logowanie",
                    'token' => $token,
                    'user' => $user
                ],200);
            }

        }catch (Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ],400);
        }
        return response([
            'message' => 'Nieprawidłowy email lub hasło'
        ],401);

    }
}
