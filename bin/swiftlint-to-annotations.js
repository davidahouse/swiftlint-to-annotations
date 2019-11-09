#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const input = process.argv.length > 2 ? process.argv[2] : null;
if (input == null) {
  console.log('No input file specified');
  process.exit(1);
}

const rootPrefix = path.dirname(path.resolve(input));
const lintResults = JSON.parse(fs.readFileSync(input));
const annotations = [];

lintResults.forEach(function(finding) {
  const fileName = finding.file.replace(rootPrefix + '/', '');
  annotations.push({
    path: fileName,
    start_line: finding.line,
    end_line: finding.line,
    start_column: finding.character,
    end_column: finding.character,
    annotation_level: finding.severity === 'Warning' ? 'warning' : 'failure',
    message: finding.reason,
    title: finding.type
  });
});

console.dir(annotations);
