<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Book extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image_path' => $this->image_path,
            'pages' => $this->pages,
            'pdf_path' => $this->pdf_path,
            'year' => $this->year,
            'ISBN' => $this->ISBN,
            'publisher' => $this->publisher,
            'price' => $this->price,
            'quantity' => $this->quantity

        ];
    }
}
