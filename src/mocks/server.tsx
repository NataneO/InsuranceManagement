// src/mocks/server.ts
import { createServer, Model, Factory } from 'miragejs';
import { Policy } from '../types'; 

export function makeServer() {
  createServer({
    models: {
      policy: Model,
    },

    factories: {
      policy: Factory.extend({
       
            id(i: number) {
                return i + 1; 
              },
            numero(i: number) {
              return 100000 + i;
            },
        valor_premio() {
          return 100.0;
        },
        segurado() {
          return {
            nome: 'Rita de Cassia da Silva',
            email: 'ritadecassia@email.com',
            cpf_cnpj: '123.456.789-00',
          };
        },
        coberturas() {
          return [{ nome: 'Incêndio', valor: 14.0 }];
        },
      }),
    },

    seeds(server) {
      server.createList('policy', 15);
    },

    routes() {
      this.namespace = 'api';

      this.get('/apolices', (schema, request) => {
        let { page = 1, pageSize = 10, search = '' } = request.queryParams;
        page = Number(page);
        pageSize = Number(pageSize);
      
        let policies = schema.all('policy').models as Policy[];
      
        if (Array.isArray(search)) {
          search = search.join(',');
        }
      
        if (search) {
          policies = policies.filter((policy) =>
            policy.numero.toString().includes(search)
          );
        }
      
        const totalItems = policies.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const content = policies.slice((page - 1) * pageSize, page * pageSize);
      
        return { content, page, totalItems, totalPages };
      });

      this.post('/apolices', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let policies = schema.all('policy').models as Policy[];
        
        // Check if the policy number already exists
        let existingPolicy = policies.find(policy => policy.numero === attrs.numero);
        if (existingPolicy) {
          return new Response();
        }
        
        let lastId = policies.length > 0 ? policies[policies.length - 1].id : 0;
        let id = lastId + 1;
      
        const newPolicy = schema.create('policy', {
          ...attrs,
          id: id,
        });
      
        return newPolicy.attrs;
      });
      this.put('/apolices/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody) as Partial<Policy>; 
        let id = request.params.id;
        let policy = schema.find('policy', id);

        if (policy) {
          policy.update(newAttrs);
          return policy;
        } else {
          return new Response('error');
        }
      });

      this.get('/apolices/:id', (schema, request) => {
        let id = request.params.id;
        return schema.find('policy', id);
      });

      this.del('/apolices/:id', (schema, request) => {
        let id = request.params.id;
        let policy = schema.find('policy', id);

        if (policy) {
          policy.destroy();
          return new Response('success');
        } else {
          return new Response('error');
        }
      });
    },
  });
}
