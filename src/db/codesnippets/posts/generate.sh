#!/bin/bash

# Directory to scan
TARGET_DIR="/mnt/d/dev/Webdevtools/src/db/codesnippets/posts"

# Iterate over each subdirectory in the directory
for DIR in "$TARGET_DIR"/*; do
  if [ -d "$DIR" ]; then
    # Create content.json with the template details in each subdirectory
    cat <<EOF > "$DIR/content.json"
[{"title":"","author":{"name":"","githubLink":"", "about":""},"doc":""}]
EOF

    echo "Created content.json in $DIR"
  fi
done
