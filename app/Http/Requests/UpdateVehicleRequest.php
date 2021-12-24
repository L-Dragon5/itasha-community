<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
            'vehicleType' => 'required|in:car,motorcycle,bicycle,other',
            'vehicleInfo' => 'string|nullable',
            'series' => 'required|string',
            'character' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|nullable',
            'country' => 'required|string',
            'designer' => 'string|nullable',
            'instagram' => 'string|nullable',
        ];
    }
}
