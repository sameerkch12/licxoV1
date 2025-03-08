import React from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Caught:", error, errorInfo);

    // ⏳ 5 seconds baad homepage pe redirect
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000);
  }

  handleRetry = () => {
    this.setState({ hasError: false, redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>⚠️ Oops! Something went wrong.</h2>
          <p>Try again after some time.</p>
          <button onClick={this.handleRetry} style={{ padding: "10px", fontSize: "16px" }}>
            🔄 Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
