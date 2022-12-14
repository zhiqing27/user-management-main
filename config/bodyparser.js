'use strict'

module.exports = {
    json: {
        /*
        |--------------------------------------------------------------------------
        | limit
        |--------------------------------------------------------------------------
        |
        | Defines the limit of JSON that can be sent by the client. If payload
        | is over 1mb it will not be processed.
        |
        */
        limit: '2mb',

        /*
        |--------------------------------------------------------------------------
        | strict
        |--------------------------------------------------------------------------
        |
        | When `scrict` is set to true, body parser will only parse Arrays and
        | Object. Otherwise everything parseable by `JSON.parse` is parsed.
        |
        */
        strict: true,

        /*
        |--------------------------------------------------------------------------
        | types
        |--------------------------------------------------------------------------
        |
        | Which content types are processed as JSON payloads. You are free to
        | add your own types here, but the request body should be parseable
        | by `JSON.parse` method.
        |
        */
        types: [
            'application/json',
            'application/json-patch+json',
            'application/vnd.api+json',
            'application/csp-report'
        ]
    },

    /*
    |--------------------------------------------------------------------------
    | Raw Parser
    |--------------------------------------------------------------------------
    |
    |
    |
    */
    raw: {
        types: [
            'text/*'
        ]
    },

    /*
    |--------------------------------------------------------------------------
    | Form Parser
    |--------------------------------------------------------------------------
    |
    |
    |
    */
    form: {
        types: [
            'application/x-www-form-urlencoded'
        ]
    },

    /*
    |--------------------------------------------------------------------------
    | Files Parser
    |--------------------------------------------------------------------------
    |
    |
    |
    */
    files: {
        types: [
            'multipart/form-data'
        ],

        /*
        |--------------------------------------------------------------------------
        | Max Size
        |--------------------------------------------------------------------------
        |
        | Below value is the max size of all the files uploaded to the server. It
        | is validated even before files have been processed and hard exception
        | is thrown.
        |
        |
        | Also this value is considered when `autoProcess` is set to true.
        |
        */
        maxSize: '10mb',

        /*
        |--------------------------------------------------------------------------
        | Auto Process
        |--------------------------------------------------------------------------
        |
        | Whether or not to auto-process files. Since HTTP servers handle files via
        | couple of specific endpoints. It is better to set this value off and
        | manually process the files when required.
        |
        | This value can contain a boolean or an array of route patterns
        | to be autoprocessed.
        */
        autoProcess: true,

        /*
        |--------------------------------------------------------------------------
        | Process Manually
        |--------------------------------------------------------------------------
        |
        | The list of routes that should not process files and instead rely on
        | manual process. This list should only contain routes when autoProcess
        | is to true. Otherwise everything is processed manually.
        |
        */
        processManually: []
    }
}