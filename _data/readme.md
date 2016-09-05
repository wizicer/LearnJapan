use following command to arrange word list

```vim
%s/（/,/g
%s/〔/,/g
%s/〕/,/g
%s/）//g
'<,'>Tabularize /,
%s/\s*\(,\)\s*/\1/g
```
