'use strict';
var inquirer = require('inquirer');
var fs = require('fs');
var shortid = require('shortid');

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

inquirer.prompt(questions).then(answers => {
  console.log('\n🐿  All done! Here is what I\'ve written down:\n');
  console.log('---');
  console.log('title: "' + answers.title + '"');
  console.log('link: "' + answers.link + '"');
  console.log('tags: ' + answers.tags);
  console.log('---');
  console.log(answers.description);
  console.log('\n');

  var filedata = '---\n' +
    'title: "' + answers.title + '"\n' +
    'link: "' + answers.link + '"\n' +
    'tags: ' + answers.tags + '\n' +
    '---\n\n' + answers.description;
  var slug = shortid.generate();
  var filename = 'src/bookmarks/' + slug + '.md';

  function writeFile() {
    fs.writeFile(filename, filedata, function () {
      console.log('🐿  I have saved your bookmark to ' + filename + '\n');
    });
  }

  writeFile();

});
