import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomePage from '../views/WelcomePage/index'
import HomePage from '../views/HomePage/index'
import DetailPage from '../views/DetailPage/index'
import FetchDemo from '../views/FetchDemo/index'

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null, // 隐藏头部
            }
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                header: null, // 隐藏头部
            }
        },
        DetailPage: {
            screen: DetailPage
        },
        FetchDemo: {
            screen: FetchDemo
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator
    },
    {
        navigationOptions: {
            header: null
        }
    }
))
// export default createAppContainer(InitNavigator)