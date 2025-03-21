import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface TreeNode {
  value: string;
  left?: TreeNode;
  right?: TreeNode;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expression Tree Visualizer';

  expression: string = "";

  tree: TreeNode | null = null;

  parseExpression() {
    this.tree = this.buildTree(this.expression.replace(/\s+/g, ''));
  }

  buildTree(expression: string): TreeNode {

    if (!expression.includes('(') && !expression.includes(')'))
      return { value: expression }

    if (expression.startsWith('(') && expression.endsWith(')')) {
      expression = expression.slice(1, -1)
    }

    let depth = 0;
    for (let i = 0; i < expression.length - 1; i++) {
      const char = expression[i];

      if (char === '(') depth++;
      if (char === ')') depth--;

      if (depth == 0 && '+-*'.includes(char)) {

        const left = expression.slice(0, i);
        const right = expression.slice(i + 1);

        return {
          value: char,
          left: this.buildTree(left),
          right: this.buildTree(right)
        }
      }
    }

    return { value: expression };
  }
}
