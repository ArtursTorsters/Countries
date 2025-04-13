<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'country_code',
    ];


    public function country()
    {
        return $this->belongsTo(Country::class, 'country_code', 'country_code');
    }


    public static function toggle($userId, $countryCode)
    {
        $favorite = static::where('user_id', $userId)
            ->where('country_code', $countryCode)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return false;
        } else {
            static::create([
                'user_id' => $userId,
                'country_code' => $countryCode,
            ]);
            return true;
        }
    }


    public static function getUserFavorites($userId)
    {
        return static::where('user_id', $userId)
            ->with('country')
            ->get()
            ->map(function ($favorite) {
                return $favorite->country;
            });
    }
}
