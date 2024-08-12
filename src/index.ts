import type { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import type { FilterPattern } from '@rollup/pluginutils';

export type ImportAsStringOptions = {
  include: FilterPattern;
  exclude?: FilterPattern;
};

export function importAsString(options: ImportAsStringOptions): Plugin {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'importAsString',
    transform(code, id) {
      if (filter(id)) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: { mappings: '' },
        };
      }
    },
  };
}

export default importAsString;
