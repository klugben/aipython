---
allowed-tools: Write(*), Read(*), Edit(*), Append(*), Bash(ls:*), Bash(date:*)
description: Generate optimized slash commands
version: "3.3.0"
author: "K.B
---

# Meta Command

Create slash commands using two-file architecture.

## Files to Generate

For command `XX`:

- **XX.md** - Command file
- **XX.changelog** - Version history

## Arguments Format




    
` "" [project|user] [requirements]`

## Process

1. Check if command exists:

   ls ~/.claude/commands/XX.md

2. Generate **XX.md**:

   ***

   allowed-tools: [required tools]
   description: one-line description
   version: "1.0.0"
   author: "K.B.n"

   ***

   # Command logic

3. Generate **XX.changelog**:

   # Changelog for XX

   ## v1.0.0 - YYYY-MM-DD

   - Initial version

   Author: K.B
   Created: YYYY-MM-DD

## Design Principles

- Generated content should display correctly in various environments
- Use universally compatible formats for code examples

## Version Rules

- New: v1.0.0
- Patch: Bug fixes (1.0.1)
- Minor: Features (1.1.0)
- Major: Breaking (2.0.0)

## Tool Selection

- Git: `Bash(git:*)`
- GitHub: `Bash(gh:*)`
- Files: `Read(*)`, `Write(*)`, `Edit(*)`
- Search: `Glob(*)`, `Grep(*)`
- Web: `WebFetch(*)`, `WebSearch(*)`

Execute: `/meta-command  "" [options]`