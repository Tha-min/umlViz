import { Component, OnInit } from '@angular/core';
import * as ts from 'typescript';

class PropertyObj { modifiers: string[]; name: string; type: string; }

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {

  node: any;
  classDecl: any;
  className: string;
  dataString: string;

  diagramData: PropertyObj[] = [];

  file = '../assets/files/person.ts';

  constructor() { }

  ngOnInit(): void {

    this.parseFile(this.file);
  }

  parseFile(file: string) {
    fetch(file).then(
      (response) => response.text())

      .then((response) => {
        this.node = this.createAST(response);

      }).then(
        (response) => {
          this.node.forEachChild(child => {
            if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
              this.classDecl = child;
              this.className = this.classDecl.name.escapedText;
            }
          });
        }
      )
      .then(
        (response) => {
          this.classDecl.members.forEach(e => {
            const propertyObj = new PropertyObj();
            if (ts.SyntaxKind[e.kind] === 'PropertyDeclaration') {
              propertyObj.name = e.name.escapedText;
              propertyObj.type = this.removeKeyword(ts.SyntaxKind[e.type.kind]);
              e.modifiers.forEach(m => {
                propertyObj.modifiers = [];
                propertyObj.modifiers.push(this.getUMLModifierSign(m.kind));
              });
              this.diagramData.push(propertyObj);
              return this.diagramData;
            }

          });

        }
      ).catch();
  }


  createAST(data: string): ts.SourceFile {
    const node = ts.createSourceFile(
      '',   // fileName
      data, // sourceText
      ts.ScriptTarget.Latest // langugeVersion
    );

    return node;
  }

  removeKeyword(keyword: string) {
    return keyword.replace('Keyword', '');
  }

  getUMLModifierSign(kind: number) {
    switch (kind) {
      case 119:
        return '+';

      case 117:
        return '-';

      case 118:
        return '#';

      default:
        return '+';
    }
  }

}
