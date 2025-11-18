#!/bin/bash

# EarthOptics Unit Tests Execution Guide

## Quick Start

### Run all tests (non-interactive)
npm test -- --watchAll=false

### Run tests in watch mode (for development)
npm test

### Run specific test file
npm test -- --testPathPattern="App.test" --watchAll=false

### Run with coverage report
npm test -- --coverage --watchAll=false --collectCoverageFrom='src/**/*.{js,jsx}'

---

## Test Files Breakdown

### Component-Level Tests (Individual Components)

# Title Component Tests
npm test -- --testPathPattern="Title.test" --watchAll=false

# Header Component Tests  
npm test -- --testPathPattern="Header.test" --watchAll=false

# Chart Component Tests
npm test -- --testPathPattern="Chart.test" --watchAll=false

# DataKPI Component Tests
npm test -- --testPathPattern="DataKPI.test" --watchAll=false

# DataTable Component Tests
npm test -- --testPathPattern="DataTable.test" --watchAll=false

# Map Component Tests (with react-map-gl mocking)
npm test -- --testPathPattern="Map.test" --watchAll=false

# LeftNav Component Tests
npm test -- --testPathPattern="LeftNav.test" --watchAll=false

# FooterDashboard Component Tests
npm test -- --testPathPattern="FooterDashboard.test" --watchAll=false

# Copyright Component Tests
npm test -- --testPathPattern="Copyright.test" --watchAll=false

# NavigationList Component Tests
npm test -- --testPathPattern="NavigationList.test" --watchAll=false

# ReportsList Component Tests
npm test -- --testPathPattern="ReportsList.test" --watchAll=false

---

### Integration Tests

# App Component Tests
npm test -- --testPathPattern="App.test" --watchAll=false

# Dashboard Component Tests (all sub-components)
npm test -- --testPathPattern="Dashboard.test" --watchAll=false

---

## Environment Variables for Testing

# Ensure these are set before running tests (optional)
export REACT_APP_SATELLITE_DATA_TOKEN="test-token"

---

## Expected Test Results

All tests should pass with output similar to:
```
PASS  src/App.test.js (X.XXXs)
  App Component
    ✓ renders without crashing
    ✓ renders dashboard title in header
    ✓ applies theme provider
    ✓ renders main Dashboard component

PASS  src/components/Title/Title.test.js (X.XXXs)
  Title Component
    ✓ renders children text correctly
    ✓ renders as h2 with h6 variant
    ✓ has primary color applied
    ✓ handles empty children gracefully
    ✓ renders with custom children components

Test Suites: 13 passed, 13 total
Tests:       80+ passed, 80+ total
Snapshots:   0 total
Time:        XX.XXXs
```

---

## Debugging Tests

### Run single test
npm test -- --testNamePattern="renders without crashing" --watchAll=false

### Run with verbose output
npm test -- --verbose --watchAll=false

### Run with specific environment
npm test -- --env=jsdom --watchAll=false

---

## Coverage Report

Generate and view coverage report:
```bash
npm test -- --coverage --watchAll=false
# Opens coverage report in ./coverage/index.html
```

Coverage areas include:
- Statements coverage
- Branch coverage
- Function coverage
- Line coverage

---

## Notes

1. Tests use React Testing Library best practices
2. Focus on user behavior, not implementation details
3. Use semantic queries for better test resilience
4. External libraries (react-map-gl) are mocked
5. Tests are independent and can run in any order
6. All tests use Material-UI theme provider
7. Mock data uses existing mockGeo.json

---

## Troubleshooting

### Issue: Tests fail with Babel errors
Solution: 
```bash
rm -rf node_modules package-lock.json
npm install
npm test -- --watchAll=false
```

### Issue: react-scripts not found
Solution:
```bash
npm install
npm test -- --watchAll=false
```

### Issue: Module not found errors
Solution:
```bash
npm install
# Clear Jest cache
npm test -- --clearCache
npm test -- --watchAll=false
```

---

## Continuous Integration

For CI/CD pipelines (GitHub Actions, Jenkins, etc.):
```bash
npm test -- --watchAll=false --coverage --verbose
```

This will:
- Run all tests
- Generate coverage reports
- Show verbose output for debugging
- Exit with proper status code
