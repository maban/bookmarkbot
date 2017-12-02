'use strict';
var inquirer = require('inquirer');
var fs = require('fs');
var slugify = require('slugify');

console.log('🐿  Oh, hello! Found something you want me to bookmark?\n');

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
      {
        name: 'frontend',
      },
      {
        name: 'backend',
      },
      {
        name: 'security',
      },
      {
        name: 'design',
      },
      {
        name: 'process',
      },
      {
        name: 'business',
      },
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

  inquirer.prompt(questions).then((answers) => {

    var title = answers.title;
    var link = answers.link;
    var tags = answers.tags + '';
    var tag = tags.split(',');
    var description = answers.description;



    console.log('\n🐿  All done! Here is what I\'ve written down:\n');
    console.log('---');
    console.log('title: "' + title + '"');
    console.log('link: "' + link + '"');
    console.log('tags: ');
    for(var i = 0; i < tag.length; i++) {
      console.log(' - ' + tag[i]);
    }
    console.log('---');
    console.log(description);
    console.log('\n');

    inquirer.prompt(confirm).then(answers => {

      for(var i = 0; i < tag.length; i++) {
        tag[i];
      }

      var filedata = '---\n' +
        'title: "' + title + '"\n' +
        'link: "' + link + '"\n' +
        'tags:\n' +
        ' - ' + tag[i] + '\n' +
        '---\n\n' + description;
      var slug = slugify(title);
      var filename = 'src/bookmarks/' + slug + '.md';

      function writeFile() {
        fs.writeFile(filename, filedata, function () {
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
