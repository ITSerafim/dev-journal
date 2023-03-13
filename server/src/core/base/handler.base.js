const AbstractHandler = require("../abstract/handler.abstract");
const BaseController = require("./controller.base");

class BaseHandler extends AbstractHandler {
  #app;
  #path;
  #controller;

  constructor(app, path, model) {
    super();
    this.#app = app;
    this.#path = path;
    this.#controller = new BaseController(model);
  }

  getAll() {
    this.#app.get(this.#path, this.#controller.getAll);
  }

  getOne() {
    this.#app.get(`${this.#path}/:id`, this.#controller.getOne);
  }

  create() {
    this.#app.post(`${this.#path}`, this.#controller.create);
  }

  update() {
    this.#app.put(`${this.#path}/:id`, this.#controller.update);
  }

  remove() {
    this.#app.delete(`${this.#path}/:id`, this.#controller.remove);
  }
}

module.exports = BaseHandler;
