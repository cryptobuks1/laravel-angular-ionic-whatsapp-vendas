<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(2),
        'description' => $faker->paragraph,
        'price' => $faker->randomFloat(2, 100, 5000),
        'stock' => $faker->numberBetween(20, 200),
    ];
});
