/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {string|null} token
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 * @property {string|null} error
 */

/**
 * @typedef {Object} ClientRequest
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'Web Development'|'Cybersecurity'|'Machine Learning'} serviceType
 * @property {string} message
 * @property {string} timestamp
 */

export {}; 