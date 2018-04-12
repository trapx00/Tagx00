import React, { ReactNode } from "react"


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  componentWhenLoading?: ReactNode;
  componentProducerWhenLoadingFailed?: (e) => ReactNode;
}

interface State<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  component: ReactNode;
  loaded: boolean;
}

export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, State<T>> {

  state = {
    render: this.props.render,
    props: this.props.props,
    component: this.props.componentWhenLoading || null,
    loaded: false
  };

  async loadComponent() {
    try {
      const component = await this.props.render(this.props.props);
      this.setState({component, loaded: true});
    } catch (e) {
      if (this.props.componentProducerWhenLoadingFailed) {
        this.setState({
            component: this.props.componentProducerWhenLoadingFailed(e),
            loaded: true
          }
        );
      }
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.loadComponent();
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      this.loadComponent();
    }

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.render !==  prevState.render || nextProps.props !== prevState.props) {
      console.log("render needed");
      return {render: nextProps.render, props: nextProps.props, loaded: false};
    } else {
      return null;
    }

  }

  render() {
    return this.state.component;
  }
}
