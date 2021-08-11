<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddFooterPageRequest;
use App\Http\Requests\EditFooterPageRequest;
use Illuminate\Http\Request;

class EditWebsiteData extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\EditFooterPageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function editInfo(EditFooterPageRequest $request)
    {
        $jsonString = file_get_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'));
        $data = json_decode($jsonString, true);



        $data[$request->input('id')]["title"] = $request->input('title');
        $data[$request->input('id')]["text"] = $request->input('text');


        $newJsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'), stripslashes($newJsonString));

        return $newJsonString;
    }
    public function deleteInfo(Request $request)
    {
        $jsonString = file_get_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'));
        $data = json_decode($jsonString, true);


        unset($data[$request->input('id')]);

        $newJsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'), stripslashes($newJsonString));



        return $newJsonString;
    }

    public function addInfo(AddFooterPageRequest $request)
    {
        $jsonString = file_get_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'));
        $data = json_decode($jsonString, true);


        $data[] = [
            'title' => $request->input('title'),
            'text' => $request->input('text')
        ];

        $newJsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(base_path('resources/js/components/pages/footerPages/footerPages.json'), stripslashes($newJsonString));

        return $newJsonString;
    }

}
