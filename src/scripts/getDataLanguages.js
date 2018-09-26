#!/usr/bin/node

// NodeJS Native
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

// NPM Libraries
const program = require('commander');
const _ = require('lodash');

// Local
const pkg = require('../../package.json');

program
  .version(pkg.version, '-v, --version')
  .description('Process directories with cloc and create the ../data/languages.json file')
  .command('stat [dirs...]', {isDefault: true})
  .action(function (dirs) {
    let languages = {
      total: {
        lineDomain: {
          min: 9999,
          max: 1,
        },
        fileDomain: {
          min: 9999,
          max: 1,
        },
      },
    };
    let projects = {};

    dirs.forEach(function (dir) {
      const excludeBase = [
        '.git',
        'bin',
        'data',
        'node_modules',
        '.idea',
        'build',
      ];
      const excludeFile = `--exclude-list-file=${__dirname.replace('scripts', 'data')}/clocExclusions.txt`;
      const cmd = `/usr/bin/cloc ${excludeFile} --fullpath --not-match-d='(${excludeBase.join('|')})' --json ./`;

      let codeStat = false;

      console.debug(`Executing: ${cmd} in ${dir}`);

      try{
        codeStat = execSync(cmd, {cwd: dir});
      } catch (e) {
        console.error(`Unable to cloc ${dir}`);
      }

      if (codeStat) {
        try{
          let codeStatJSON = JSON.parse(codeStat.toString().replace(/\n/, ''));
          let project = `${dir.replace(path.dirname(dir), '').replace(/\//, '')}`;

          languages[project] = {
            lineDomain: {
              min: 9999,
              max: 1,
            },
            fileDomain: {
              min: 9999,
              max: 1,
            },
          };

          _.map(codeStatJSON, (languageStat, language) => {

            if(
              language.indexOf('SUM') === -1 &&
              language.indexOf('header') === -1
            ) {
              language = language;

              languages[project][language] = {
                files: languageStat.nFiles,
                lines: languageStat.code,
              };
              languages['total'][language] = {
                files: languageStat.nFiles,
                lines: languageStat.code,
              };

              if(_.isUndefined(projects[language])) {
                projects[language] = [];
              }

              projects[language].push(project);

              //project domain
              if (languages[project].lineDomain.min > languages[project][language].lines) {
                languages[project].lineDomain.min = languages[project][language].lines;
              }
              if (languages[project].lineDomain.max < languages[project][language].lines) {
                languages[project].lineDomain.max = languages[project][language].lines;
              }

              if (languages[project].fileDomain.min > languages[project][language].files) {
                languages[project].fileDomain.min = languages[project][language].files;
              }
              if (languages[project].fileDomain.max < languages[project][language].files) {
                languages[project].fileDomain.max = languages[project][language].files;
              }

              // languages totals domain
              if (languages.total.lineDomain.min > languages['total'][language].lines) {
                languages.total.lineDomain.min = languages['total'][language].lines;
              }
              if (languages.total.lineDomain.max < languages['total'][language].lines) {
                languages.total.lineDomain.max = languages['total'][language].lines;
              }

              if (languages.total.fileDomain.min > languages['total'][language].files) {
                languages.total.fileDomain.min = languages['total'][language].files;
              }
              if (languages.total.fileDomain.max < languages['total'][language].files) {
                languages.total.fileDomain.max = languages['total'][language].files;
              }
            }
          });
        } catch (e) {
          console.error(e);
          console.error(`Unable to read cloc output for ${dir}`);
        }
      }
    });

    try {
      fs.writeFileSync(
        './src/data/languages.json',
        JSON.stringify(languages),
        {
          encoding: 'utf8',
        }
      );
      fs.writeFileSync(
        './src/data/languages-to-projects.json',
        JSON.stringify(projects),
        {
          encoding: 'utf8',
        }
      );
    } catch (e) {
      console.error(e);
      console.error('Unable to save json file...');
    }
  });

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}
