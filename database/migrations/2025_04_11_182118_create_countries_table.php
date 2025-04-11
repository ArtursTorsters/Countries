<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('country_code', 3)->unique()->comment('Country code');
            $table->string('common_name');
            $table->string('official_name');
            $table->bigInteger('population');
            $table->integer('population_rank')->nullable();
            $table->float('area', 15, 2)->nullable();
            $table->json('flag')->nullable();
            $table->json('borders')->nullable();
            $table->json('languages')->nullable();
            $table->json('translations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
