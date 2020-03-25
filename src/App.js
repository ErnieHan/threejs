import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { setApp, readThemeCookie, changeTheme } from "./store/actions";
// i18n
import { Translation } from "react-i18next";
import i18n from "i18next";
// Router
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
// Style-Components
import styled from "styled-components";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Page404 from "./pages/Page404";
// function
import getCookie from "./function/getCookie";
import writeCookie from "./function/writeCookie";
import ErrorMessage from "./components/ErrorMessage";

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 35px 15px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
`;

const LanguageButton = styled.button`
  min-width: 250px;
  padding: 12px;
  background: #111111;
  color: #ffffff;
  font-size: 14px;
  border: 0;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  position: relative;
  width: 70px;
  height: 35px;
  display: block;
  cursor: pointer;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    background: #e9e9e9;
    border-radius: 50px;
    transition: all 300ms;
  }
  div::after {
    content: "";
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    border: 1px solid #ccc;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms;
    left: 0;
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked ~ div {
    background: #4bd162;
  }
  input[type="checkbox"]:checked ~ div::after {
    left: 100%;
    transform: translateY(-50%) translateX(-100%);
  }
`;

class App extends React.Component {
  state = {
    language: "zhTW"
  };

  componentDidMount() {
    const { readThemeCookie } = this.props;
    // 設置語言包
    // 1. 抓取語言的Cookie
    const language_cookie = getCookie("language");
    if (!language_cookie) {
      // 2. 沒有語言的Cookie的話先設定預設為zhTW
      writeCookie("language", "zhTW");
    } else {
      // 3. 有語言的Cookie的話便抓取
      const now_language_cookie = getCookie("language");
      this.setState({
        language: now_language_cookie
      });
      i18n.changeLanguage(now_language_cookie);
      document.documentElement.lang = now_language_cookie;
    }
    readThemeCookie();
  }

  changeLanguage = () => {
    if (this.state.language === "zhTW") {
      // 修改為繁體中文
      this.setState({
        language: "en"
      });
      i18n.changeLanguage("en");
      writeCookie("language", "en");
      document.documentElement.lang = "en";
    } else {
      // 修改為英文
      this.setState({
        language: "zhTW"
      });
      i18n.changeLanguage("zhTW");
      writeCookie("language", "zhTW");
      document.documentElement.lang = "zhTW";
    }
  };

  handleChangeTheme = () => {
    const { changeTheme, themeName } = this.props;
    if (themeName === "primary") {
      // 切換為暗色主題
      changeTheme("dark");
    } else {
      // 切換為亮色主題
      changeTheme("primary");
    }
  };

  render() {
    const { getThemeSuccessfully, themeName, themeColors } = this.props;
    return (
      getThemeSuccessfully && (
        <Content theme={themeColors}>
          <style>{`
          body{
            background: ${themeColors.background};
          }
          `}</style>
          <Translation>{t => <h1>{t("app.hello")}</h1>}</Translation>
          <LanguageButton onClick={this.changeLanguage}>
            點擊切換語言，目前語言為：{this.state.language}
          </LanguageButton>
          <Label>
            <input
              type="checkbox"
              onChange={this.handleChangeTheme}
              checked={themeName === "dark"}
            />
            <div />
          </Label>
          <ErrorMessage />
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">
                      -<Translation>{t => <>{t("app.home")}</>}</Translation>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      -<Translation>{t => <>{t("app.about")}</>}</Translation>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users">
                      -<Translation>{t => <>{t("app.users")}</>}</Translation>
                    </Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            </div>
          </Router>
        </Content>
      )
    );
  }
}

App.propTypes = {
  setApp: PropTypes.func,
  setAppActive: PropTypes.bool,
  readThemeCookie: PropTypes.func,
  themeName: PropTypes.string,
  themeColors: PropTypes.object,
  getThemeSuccessfully: PropTypes.bool,
  changeTheme: PropTypes.func
};

const mapStateToProps = state => ({
  setAppActive: state.app.active,
  themeName: state.app.updateTheme.themeName,
  themeColors: state.app.updateTheme.themeColors,
  getThemeSuccessfully: state.app.updateTheme.getThemeSuccessfully
});

const mapDispatchToProps = dispatch => {
  return {
    setApp: () => dispatch(setApp()),
    readThemeCookie: () => dispatch(readThemeCookie()),
    changeTheme: themeName => dispatch(changeTheme(themeName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
