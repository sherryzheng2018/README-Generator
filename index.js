const inquirer = require('inquirer');
const fs = require('fs');

const licenses = {
  'MIT': {
    'name': 'The MIT License',
    'badge': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'link': 'https://opensource.org/licenses/MIT',
    'description': 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'
  },
  'IBM': {
    'name': 'IBM Public License Version 1.0',
    'badge': '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
    'link': 'https://opensource.org/licenses/IPL-1.0',
    'description': 'THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS IBM PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT\'S ACCEPTANCE OF THIS AGREEMENT.'
  },
  'Eclipse': {
    'name': 'Eclipse Public License 1.0',
    'badge': '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)',
    'link': 'https://opensource.org/licenses/EPL-1.0',
    'description': 'THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT\'S ACCEPTANCE OF THIS AGREEMENT.'
  },
};


const promptInfo = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'A brief description of what this project does and who it is for'
    },
    {
      type: 'input',
      name: 'installation',
      message: '',
    },
    {
      type: 'input',
      name: 'usage',
      message: '',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Select your license.',
      choices: ['MIT','IBM', 'Eclipse']
    },
    {
      type: 'input',
      name: 'contributing',
      message: '',
    },
    {
      type: 'input',
      name: 'tests',
      message: '',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub url',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email',
    },
  ]);
};

const generateREADME = ({title, description, installation, usage, license, contributing, tests, github, email}) => {
  console.log(licenses[license])
  return `# **${title}**

## Project Description
___

${description}



${licenses[license].badge}

### Table of Contents
___
- **[Installation Instructions](#installation-instructions)**<br>
- **[Usage Instructions](#usage-instructions)**<br>
- **[License](#license)**<br>
- **[Contributing](#contributing)**<br>
- **[Tests](#tests)**<br>
- **[Question](#questions)**<br>

## Installation Instructions
___
${installation}

## Usage Instructions
___
${usage}

## License
___
[${licenses[license].name}](${licenses[license].link})

${licenses[license].description}

## Contributing
___
${contributing}

## Tests
___
${tests}

## Question
___
Per any questions, please contact

GitHub: ${github}

Email: ${email}

`;}


const init = () => {
  promptInfo()
    .then((answers)=>fs.writeFileSync('README.md', generateREADME(answers)))
    .then(()=>console.log('Successfully generated a README'))
    .catch((err)=>console.error(err))
};

init();