<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('country_code', 3);
            $table->timestamps();
            $table->unique(['user_id', 'country_code']);
            $table->foreign('country_code')->references('country_code')->on('countries');
                });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
