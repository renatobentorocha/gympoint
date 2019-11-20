import React from 'react';
import PropTypes from 'prop-types';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '~/components/Header';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import AssistanceList from '~/pages/AssistanceList';
import Assistance from '~/pages/AssistanceList/Assistance';
import Checkins from '~/pages/Checkins';

const CheckinsTabBar = ({ focused }) => (
  <MaterialCommunity
    name="map-marker-check"
    size={20}
    color={focused ? '#ee4e62' : '#999'}
  />
);

CheckinsTabBar.propTypes = {
  focused: PropTypes.bool.isRequired,
};

const AssistanceTabBar = ({ focused }) => (
  <MaterialIcons
    name="live-help"
    size={20}
    color={focused ? '#ee4e62' : '#999'}
  />
);

AssistanceTabBar.propTypes = {
  focused: PropTypes.bool.isRequired,
};

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Checkins: {
              screen: createStackNavigator(
                { Checkins },
                {
                  defaultNavigationOptions: {
                    headerTitle: props => <Header props={props} />,
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: CheckinsTabBar,
              },
            },
            Help: {
              screen: createStackNavigator(
                {
                  AssistanceList,
                  Assistance,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: props => <Header props={props} />,
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: AssistanceTabBar,
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ef5568',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
