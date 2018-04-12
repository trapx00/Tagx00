import React, { ReactNode } from "react"


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  componentWhenLoading?: ReactNode;
  componentProducerWhenLoadingFailed?: (e) => ReactNode;
}

interface State {
  component: ReactNode;
  loaded: boolean;
}

export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, State> {

  state = {
    component: this.props.componentWhenLoading || null,
    loaded: false
  };

  async loadComponent() {
    try {
      const component = await this.props.render(this.props.props);
      this.setState({component});
    } catch (e) {

      if (this.props.componentProducerWhenLoadingFailed) {
        this.setState({
          component: this.props.componentProducerWhenLoadingFailed(e)});
      }
    }
    this.setState({ loaded: true });
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

  static getDerivedStateFromProps(nextProps) {
    return {loaded: false};
  }

  render() {
    return this.state.component;
  }
}
