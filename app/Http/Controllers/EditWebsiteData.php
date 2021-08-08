<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EditWebsiteData extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function editRules(Request $request)
    {
        $jsonString = file_get_contents(base_path('resources/lang/footerPages.json'));
        $data = json_decode($jsonString, true);



        $data[$request->input('id')]["title"] = $request->input('title');
        $data[$request->input('id')]["text"] = $request->input('text');


        $newJsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(base_path('resources/lang/footerPages.json'), stripslashes($newJsonString));

        return $newJsonString;
    }


}
