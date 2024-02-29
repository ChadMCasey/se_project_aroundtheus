export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElem = document.querySelector(nameSelector);
    this._jobElem = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      job: this._jobElem.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElem.textContent = name;
    this._jobElem.textContent = job;
  }
}
