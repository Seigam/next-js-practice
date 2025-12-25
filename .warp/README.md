# Warp Configuration for next_fullstack

This directory contains Warp-specific configuration files to optimize your development experience.

## Files

### `workflows.yaml`
Quick access to common development tasks. Use Warp's workflow picker to run:
- **dev**: Start development server
- **build**: Production build
- **lint**: Code quality checks
- **type-check**: TypeScript validation
- **clean**: Clean build and reinstall dependencies
- And more!

### `ignore`
Excludes unnecessary files/directories from Warp's search and indexing:
- `node_modules/`, `.next/`, build outputs
- Cache directories
- Environment files
- IDE and OS files

### `context.yaml`
Provides AI context about your project:
- Tech stack (Next.js 16, React 19, TypeScript, Tailwind CSS)
- Project structure and conventions
- Common commands and tasks
- File naming patterns

## Benefits

✅ **Faster searches** - Ignores node_modules and build artifacts  
✅ **Quick commands** - Access workflows with Ctrl+Shift+R (or Cmd+Shift+R on Mac)  
✅ **Better AI assistance** - Context-aware suggestions based on your stack  
✅ **Consistent patterns** - Documents project conventions

## Usage

1. **Run workflows**: Open Warp's command palette and select a workflow
2. **AI context**: Warp AI automatically uses context.yaml for better suggestions
3. **Search optimization**: Ignored patterns improve search performance

## Customization

Feel free to modify these files to match your workflow:
- Add new workflows for common tasks
- Update ignore patterns for your needs
- Expand context with project-specific information
