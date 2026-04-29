'use strict';

/* =========================
   API SERVICE
========================= */

const ApiService = {
  baseUrl: 'https://jsonplaceholder.typicode.com',

  /**
   * Método genérico para hacer peticiones HTTP
   * @param {string} endpoint - Ruta del endpoint (ej: '/posts')
   * @param {object} options - Opciones de fetch (method, body, headers)
   * @returns {Promise} - Promesa con los datos parseados
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Configuración por defecto
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);

      // fetch NO lanza error en 4xx/5xx - debemos verificar response.ok
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // Si es 204 No Content, no hay body que parsear
      if (response.status === 204) {
        return null;
      }

      return await response.json();

    } catch (error) {
      console.error('Error en petición:', error);
      throw error;
    }
  },

  // GET TODOS LOS POSTS
  async getPosts(limit = 10) {
    return this.request(`/posts?_limit=${limit}`);
  },

  // GET POR ID
  async getPostById(id) {
    return this.request(`/posts/${id}`);
  },

  // POST (CREAR)
  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  },

  // PUT (ACTUALIZAR)
  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    });
  },

  // DELETE
  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE'
    });
  },

  // (este ya estaba bien)
  async getPostsByUser(userId) {
    return this.request(`/posts?userId=${userId}`);
  }
};