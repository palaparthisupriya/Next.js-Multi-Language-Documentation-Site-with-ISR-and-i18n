'use client';

import {useEffect} from 'react';
import {Copy, Check} from 'lucide-react';
import {useState} from 'react';

export default function CodeBlockManager() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((block) => {
      if (block.querySelector('.copy-button')) return;

      const container = document.createElement('div');
      container.className = 'relative group';
      block.parentNode?.insertBefore(container, block);
      container.appendChild(block);

      const button = document.createElement('button');
      button.className = 'copy-button absolute right-2 top-2 p-1 rounded bg-muted hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity';
      button.setAttribute('data-testid', 'copy-code-button');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
      
      button.onclick = () => {
        const code = block.querySelector('code')?.innerText || '';
        navigator.clipboard.writeText(code);
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        }, 2000);
      };

      container.appendChild(button);
      block.setAttribute('data-testid', 'code-block');
    });
  }, []);

  return null;
}
