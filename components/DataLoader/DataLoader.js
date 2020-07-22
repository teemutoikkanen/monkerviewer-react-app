import React from 'react';


function DataLoader(props) {

    var fs = require('fs');
    var files = fs.readdirSync('../');

    return (
        <div>
            {files}
            dataload
            cmon baby cmon
        </div>
    );
}

export default DataLoader