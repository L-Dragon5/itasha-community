<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'vehicle_type' => 'required|in:car,motorcycle,bicycle,other',
            'vehicle_information' => 'string|nullable',
            'series' => 'required|string',
            'character' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|nullable',
            'country' => 'required|string',
            'lat' => 'numeric|nullable',
            'lng' => 'numeric|nullable',
            'designer' => 'string|nullable',
            'instagram' => 'string|nullable',
            'twitter' => 'string|nullable',
            'cover_image' => 'image|nullable',
        ];
    }

    /**
     * Prepare data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        $twitter_val = str_replace('https://twitter.com/', '', $this->twitter);
        $twitter_val = ltrim($twitter_val, '@');
        $twitter_val = rtrim($twitter_val, '/');

        $instagram_val = str_replace('https://instagram.com/', '', $this->instagram);
        $instagram_val = ltrim($instagram_val, '@');
        $instagram_val = rtrim($instagram_val, '/');

        $this->merge([
            'twitter' => $twitter_val,
            'instagram' => $instagram_val,
        ]);
    }
}
