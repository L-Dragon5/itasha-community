<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetFieldsToEmptyString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->string('city')->nullable(false)->default('')->change();
            $table->string('state')->nullable(false)->default('')->change();
        });

        Schema::table('designers', function (Blueprint $table) {
            $table->string('city')->nullable(false)->default('')->change();
            $table->string('state')->nullable(false)->default('')->change();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->string('state')->nullable(false)->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->string('city')->nullable()->default(null)->change();
            $table->string('state')->nullable()->default(null)->change();
        });

        Schema::table('designers', function (Blueprint $table) {
            $table->string('city')->nullable()->default(null)->change();
            $table->string('state')->nullable()->default(null)->change();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->string('state')->nullable()->default(null)->change();
        });
    }
}
