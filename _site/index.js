'use strict';
var inquirer = require('inquirer');
var fs = require('fs');
var slugify = require('slugify');

var questions = [
  {
    type: 'input',
    name: 'link',
    message: 'What is the url?',
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title?',
  },
  {
    type: 'checkbox',
    name: 'tags',
    message: 'Would you like me to add any tags?',
    choices: [
      { name: 'frontend' },
      { name: 'backend' },
      { name: 'security' },
      { name: 'design' },
      { name: 'process' },
      { name: 'business' },
    ],
  },
  {
    type: 'input',
    name: 'description',
    message: 'How about a description?',
  },
];

var confirm = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Does this look good?',
  },
];

function askQuestions() {

  console.log('🐿  Oh, hello! Found something you want me to bookmark?\n');

  inquirer.prompt(questions).then((answers) => {

    var title = answers.title;
    var link = answers.link;
    var tags = answers.tags + '';
    var description = answers.description;
    var output = '---\n' +
                 'title: "' + title + '"\n' +
                 'link: "' + link + '"\n' +
                 'tags: [' + tags + ']\n' +
                 '---\n' + description + '\n';

    console.log('\n🐿  All done! Here is what I\'ve written down:\n');
    console.log(output);

    inquirer.prompt(confirm).then(answers => {

      var slug = slugify(title);
      var filename = '_bookmarks/' + slug + '.md';

      function writeFile() {
        fs.writeFile(filename, output, function () {
          console.log('\n🐿  Great! I have saved your bookmark to ' +
          filename +
          '. Now deploying…\n');
        });
      }

      if (answers.confirm) {
        // Make the file
        writeFile();
      } else {
        // Ask the questions again
        console.log('\n🐿  Oops, let\'s try again!\n');
        askQuestions();
      }

    });

  });

}

askQuestions();
