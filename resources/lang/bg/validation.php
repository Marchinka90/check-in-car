<?php

return [
    'required' => 'Полето :attribute е задължително.',
    'string' => ':attribute трябва да бъде текст.',
    'numeric' => 'Полето :attribute трябва да е число.',
    'date' => ':attribute трябва да бъде валидна дата.',
    'email' => ':attribute трябва да бъде валиден имейл адрес.',
    'boolean' => 'Полето :attribute трябва да бъде отметнато.',
    'date_format' => ':attribute трябва да бъде в правилния формат',
    'captcha_api' => 'Полето :attribute трябва да бъде попълнено.', 

    // Add more custom error messages as needed
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'username' => 'Потребителско име',
        'password' => 'Парола',
        'password_confirmation' => 'Повтори парола',
        'firstname' => 'Име',
        'surname' => 'Презиме',
        'lastname' => 'Фамилия',
        'phone' => 'Телефон',
        'email' => 'И-мейл',
        'selectedDate' => 'Датата',
        'selectedHour' => 'Часът',
        'agreedTerms' => 'Условия за ползване',
        'plateLicense' => 'Регистрационен номер',
        'vehicleCategory' => 'Категория на автомобила',
        'captcha' => 'Символи от картинката'
    ],
];
