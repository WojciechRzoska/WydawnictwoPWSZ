<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MagazineFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('magazine_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('magazine_id');
            $table->string('pdf_path');
            $table->timestamps();
            $table->foreign('magazine_id')
                ->references('id')
                ->on('magazines')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('magazine_files');
    }
}
