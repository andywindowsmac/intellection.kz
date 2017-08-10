/* @flow */

import React, {Component} from 'react';
import Popup from 'react-popup';

import ValidationUtils from 'utils/ValidationUtils';
import Page from 'layouts/Page';

import styles from './index.css';

const MESSAGE_NOT_RECEVIED = 'Сообщение не доставлено';

const POP_UP_MESSAGE = {
  invalidEmail: () => Popup.alert('Не правильный email'),
  emptyInput: () => Popup.alert('Заполните все поля'),
};

class ServicesPage extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    buttonText: 'НАЧАТЬ ПРОЕКТ',
    disabled: '',
  };

  handleChandle(property, value) {
    this.setState({[property]: value});
    console.log(this.state.name, this.state.email, this.state.message);
  }
  validInput = (): boolean =>
    ValidationUtils.isValidEmail(this.state.email) &&
    this.state.message &&
    this.state.name;

  handleSubmit = () => {
    console.log('Click');
    if (!this.validInput()) {
      Popup.alert(POP_UP_MESSAGE.emptyInput());
    }
    if (!this.isValidEmail()) {
      Popup.alert(POP_UP_MESSAGE.invalidEmail());
    } else {
      this.sendMessage();
    }
  };
  sendMessage = () => {
    fetch('https://mandrillapp.com/api/1.0/messages/send.json', {
      method: 'POST',
      body: JSON.stringify({
        key: 'B1AoYTIo1KTLERLF1WOiRg',
        message: {
          from_email: 'info@intellection.kz',
          to: [
            {
              email: 'intellection.kz@gmail.com',
              type: 'to',
            },
          ],
          subject: 'APPLICATION FORM (intellection.kz)',
          html: `Name: ${this.state.name} <br />Email: ${this.state
            .email} <br />Message: ${this.state.message} <br />`,
        },
      }),
    })
      .then(() => this.success()) // eslint-disable-line promise/prefer-await-to-then
      .catch(() => Popup.alert(MESSAGE_NOT_RECEVIED));
  };
  success = () => {
    this.setState({email: ''});
    this.setState({name: ''});
    this.setState({message: ''});
    this.setState({buttonText: 'SUCCESSFULLY CREATED'});
    this.setState({disabled: 'true'});
  };
  render() {
    return (
      <Page {...Page.pickPageProps(this.props)}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div className={styles.intro1}>
              <h1>
                Только что придумали новый Instagram? Мы можем построить его для
                Вас
              </h1>
              <p>
                Мы предлагаем услуги разработки мобильных приложений и
                веб-сайтов любой сложности. Наша команда состоит из 15-ти
                одаренных программистов и дизайнеров, которые уже создали более
                20 проектов для местных и зарубежных клиентов.
              </p>
              <h2>Почему именно мы?</h2>
              <ul className={styles.lists}>
                <li className={styles.list}>
                  Итеративный процесс разработки (Agile)
                </li>
                <li className={styles.list}>Для нас качество выше цены</li>
                <li className={styles.list}>У нас самый лучший дизайн</li>
                <li className={styles.list}>
                  Абсолютная прозрачность ценообразования
                </li>
              </ul>
            </div>
            <div className={styles.intro2}>
              <div className={styles.form}>
                <h1>Создайте свой цифровой продукт сегодня</h1>
                <p>Позвольте нам воплотить вашу идею в реальность</p>
                <div className={styles.firstForm}>
                  <div className={styles.nameForm}>
                    <p style={{color: '#a8acb9'}}>ВАШЕ ИМЯ</p>
                    <input
                      id={styles.name}
                      className={styles.textInput}
                      placeholder="имя"
                      value={this.state.name}
                      onChange={a => this.handleChange('name', a.target.value)}
                    />
                  </div>
                  <div className={styles.emailForm}>
                    <p style={{color: '#a8acb9'}}>EMAIL</p>
                    <input
                      id={styles.email}
                      className={styles.textInput3}
                      placeholder="example@gmail.com"
                      value={this.state.email}
                      onChange={b =>
                        this.handleChandle('email', b.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.secondForm} />
                <p style={{color: '#a8acb9', textAlign: 'left'}}>
                  ОПИШИТЕ ВАШ ПРОЕКТ
                </p>
                <textarea
                  value={this.state.message}
                  className={styles.textInput2}
                  placeholder="опишите проект в 2-3 предложениях. Напишите, что вам требуется: мобильное приложение, веб-сайт, игра на Unity, проект по виртуальной реальности, искусственный интеллект..."
                  rows="7"
                  cols="50"
                  name="comment"
                  form="usrform"
                  id="comment"
                  onChange={c => this.handleChandle('message', c.target.value)}
                />
                <input
                  type="button"
                  id={styles.submit}
                  value={this.state.buttonText}
                  onClick={this.submit}
                  disabled={this.state.disabled}
                />
              </div>
            </div>
          </div>
          <div className={styles.process}>
            <div className={styles.process1}>
              <p style={{textAlign: 'center', paddingTop: '33px'}}>Процесс</p>
            </div>
            <div className={styles.process2}>
              <div className={styles.icon1}>
                <div className={styles.circle1}>
                  <img
                    className={styles.img1}
                    alt=""
                    src={'/assets/icons/circle1.png'}
                  />
                </div>
                <p>Анализ и планирование</p>
              </div>
              <div className={styles.icon1}>
                <div className={styles.circle1} />
                <img
                  className={styles.img1}
                  alt=""
                  src={'/assets/icons/circle2.png'}
                />
                <p>Дизайн</p>
              </div>
              <div className={styles.icon1}>
                <div className={styles.circle1} />
                <img
                  className={styles.img1}
                  alt=""
                  src={'/assets/icons/circle3.png'}
                />
                <p>Разработка</p>
              </div>
              <div className={styles.icon1}>
                <div className={styles.circle1} />
                <img
                  className={styles.img1}
                  alt=""
                  src={'/assets/icons/circle4.png'}
                />
                <p>Поддержка</p>
              </div>
            </div>
          </div>
          <div className={styles.projects}>
            <div className={styles.ptitle}>
              <h2>Некоторые наши проекты</h2>
            </div>
            <div className={styles.projectsName}>
              <div className={styles.firstProject}>
                <img
                  className={styles.logo}
                  alt=""
                  src={'/assets/icons/Qazaq__logo.png'}
                />
                <h3 className={styles.projectName}>Qazaq App</h3>
                <p className={styles.aboutProject}>
                  Приложение по изучению казахского языка
                </p>
              </div>
              <div className={styles.secondProject}>
                <img
                  className={styles.logo}
                  alt=""
                  src={'/assets/icons/Fenix_logo.png'}
                />
                <h3 className={styles.projectName}>Fenix News</h3>
                <p className={styles.aboutProject}>
                  Аггрегатор новостных сайтов
                </p>
              </div>
              <div className={styles.thirdProject}>
                <img
                  className={styles.logo}
                  alt=""
                  src={'/assets/icons/Star_logo.png'}
                />
                <h3 className={styles.projectName}>Я звезда!</h3>
                <p className={styles.aboutProject}>
                  Проведение кастингов и конкурсов онлайн
                </p>
              </div>
            </div>
            <div className={styles.ssylka}>
              <a className={styles.link} href="/startups">
                посмотреть все
              </a>
            </div>
          </div>
          <div className={styles.prices}>
            <div className={styles.titlePrice}>
              <p>Примерные цены</p>
            </div>
            <div className={styles.pricesBlock}>
              <div className={styles.price}>
                <p className={styles.simple}>Базовый функционал</p>
                <p>от 100 до 300 часов работы </p>
                <p>Около 5-ти экранов </p>
                <p>Одна платформа </p>
                <p>Несложный функционал </p>
                <p>Публикация на рынках App Store, Google Play </p>
                <p style={{color: '#51a9f2', fontSize: '33px'}}>$1000-$4000</p>
              </div>
              <div className={styles.price}>
                <p className={styles.simple}>Средняя сложность</p>
                <p>от 300 до 800 часов работы </p>
                <p>Около 10-ти экранов </p>
                <p>Несколько платформ </p>
                <p>Более сложный функционал </p>
                <p>Публикация на рынках App Store, Google Play </p>
                <p style={{color: '#51a9f2', fontSize: '33px'}}>$4000-$12000</p>
              </div>
              <div className={styles.price}>
                <p className={styles.simple}>Сложное решение</p>
                <p>Более 800 часов работы </p>
                <p>Более 10-ти экранов </p>
                <p>Несколько платформ </p>
                <p>Сложный функционал </p>
                <p>Публикация на рынках App Store, Google Play </p>
                <p style={{color: '#51a9f2', fontSize: '33px'}}>&gt;$12000</p>
              </div>
            </div>
            <button
              className={styles.submit2}
              type="reset"
              value="Reset"
              onClick={this.submit}
            >
              НАЧАТЬ ПРОЕКТ
            </button>
          </div>
        </div>
      </Page>
    );
  }
}

export default ServicesPage;
