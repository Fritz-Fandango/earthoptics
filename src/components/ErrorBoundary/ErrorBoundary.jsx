import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  box: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.error.main,
  },
  message: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  details: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    textAlign: "left",
    fontFamily: "monospace",
    fontSize: "0.875rem",
    overflowX: "auto",
    maxHeight: "200px",
    overflowY: "auto",
  },
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console (development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    // In production, you would send this to a logging service
    // Example: logErrorToService(error, errorInfo);

    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Prevent multiple error boundary catches
    if (this.state.errorCount > 10) {
      // In production, could redirect to error page or show different message
      console.error("Too many errors. Please refresh the page.");
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const classes = useStyles();

    if (this.state.hasError) {
      return (
        <Container maxWidth="md" className={classes.container}>
          <Box className={classes.box}>
            <Typography variant="h4" className={classes.title}>
              Something Went Wrong
            </Typography>
            <Typography variant="body1" className={classes.message}>
              We're sorry for the inconvenience. An error occurred while loading
              the application.
            </Typography>
            <Typography variant="body2" className={classes.message}>
              Please try refreshing the page or contact support if the problem
              persists.
            </Typography>

            {/* Only show error details in development */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box className={classes.details}>
                <Typography variant="subtitle2" style={{ marginBottom: "8px" }}>
                  Error Details (Development Only):
                </Typography>
                <Typography variant="caption" component="div">
                  {this.state.error.toString()}
                </Typography>
                {this.state.errorInfo && (
                  <Typography
                    variant="caption"
                    component="div"
                    style={{ marginTop: "8px" }}
                  >
                    {this.state.errorInfo.componentStack}
                  </Typography>
                )}
              </Box>
            )}

            <Box style={{ marginTop: "24px" }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: "8px 24px",
                  fontSize: "16px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
