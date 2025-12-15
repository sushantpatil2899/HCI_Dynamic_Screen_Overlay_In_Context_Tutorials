import sys
import json
from PyQt5 import QtCore, QtGui, QtWidgets
from pynput import mouse, keyboard

# ======================================================================
# ---------------------- DESIGN SYSTEM COLORS ---------------------------
# ======================================================================

COLORS = {
    "primary": "#0078D4",          # Microsoft Blue
    "primary_hover": "#0066B8",    # Darker blue for hover
    "text_dark": "#2A2A2A",        # Dark gray text
    "text_medium": "#5C5C5C",      # Medium gray text
    "text_light": "#FFFFFF",       # White text
    "background": "#F8F9FB",       # Light background
    "success": "#10B981",          # Green
    "warning": "#F59E0B",          # Orange
    "error": "#EF4444",            # Red
    "shadow": "rgba(0, 0, 0, 0.1)",
    "overlay_bg": "rgba(248, 249, 251, 0.95)",
}

# ======================================================================
# ---------------------- LOAD STEPS FROM JSON ---------------------------
# ======================================================================

def load_steps_from_json(path):
    try:
        with open(path, "r") as file:
            data = json.load(file)
            return data["steps"]
    except Exception as e:
        print("Error loading JSON:", e)
        sys.exit(1)


# ======================================================================
# ------------------------- DRAWING FUNCTIONS ---------------------------
# ======================================================================

def draw_text(painter, params):
    """Draw text with modern styling, background pill, and shadow"""
    painter.setRenderHint(QtGui.QPainter.Antialiasing)
    painter.setRenderHint(QtGui.QPainter.TextAntialiasing)
    
    x, y = params["position"]
    content = params["content"]
    font_size = params.get("font_size", 16)
    color = params.get("color", COLORS["text_dark"])
    
    # Use modern font (Segoe UI on Windows, similar to Inter)
    font = QtGui.QFont("Segoe UI", font_size, QtGui.QFont.Medium)
    painter.setFont(font)
    
    # Calculate text dimensions
    metrics = QtGui.QFontMetrics(font)
    text_rect = metrics.boundingRect(content)
    padding_x = 16
    padding_y = 10
    
    # Draw background pill with shadow
    pill_rect = QtCore.QRectF(
        x - padding_x,
        y - text_rect.height() - padding_y,
        text_rect.width() + padding_x * 2,
        text_rect.height() + padding_y * 2
    )
    
    # Shadow
    shadow_offset = 3
    shadow_rect = pill_rect.translated(shadow_offset, shadow_offset)
    painter.setOpacity(0.15)
    painter.setPen(QtCore.Qt.NoPen)
    painter.setBrush(QtGui.QColor(0, 0, 0))
    painter.drawRoundedRect(shadow_rect, 8, 8)
    
    # Background pill
    painter.setOpacity(0.98)
    painter.setPen(QtCore.Qt.NoPen)
    painter.setBrush(QtGui.QColor(COLORS["text_light"]))
    painter.drawRoundedRect(pill_rect, 8, 8)
    
    # Text
    painter.setOpacity(1.0)
    painter.setPen(QtGui.QColor(color))
    painter.drawText(int(x), int(y), content)


def draw_arrow(painter, params):
    """Draw modern arrow with anti-aliasing and shadows"""
    painter.setRenderHint(QtGui.QPainter.Antialiasing)
    
    x, y = params["start"]
    length = params["length"]
    color = params.get("color", COLORS["primary"])  # Default to primary blue
    thickness = params.get("thickness", 4)
    direction = params["direction"]
    
    pen = QtGui.QPen(QtGui.QColor(color), thickness, QtCore.Qt.SolidLine, QtCore.Qt.RoundCap, QtCore.Qt.RoundJoin)
    painter.setPen(pen)
    
    # Draw shadow first
    painter.setOpacity(0.2)
    shadow_pen = QtGui.QPen(QtGui.QColor(0, 0, 0), thickness, QtCore.Qt.SolidLine, QtCore.Qt.RoundCap, QtCore.Qt.RoundJoin)
    painter.setPen(shadow_pen)
    
    shadow_offset = 2
    
    if direction == "up":
        painter.drawLine(x + shadow_offset, y + shadow_offset, x + shadow_offset, y - length + shadow_offset)
        painter.drawLine(x + shadow_offset, y - length + shadow_offset, x - 12 + shadow_offset, y - length + 18 + shadow_offset)
        painter.drawLine(x + shadow_offset, y - length + shadow_offset, x + 12 + shadow_offset, y - length + 18 + shadow_offset)
    elif direction == "down":
        painter.drawLine(x + shadow_offset, y + shadow_offset, x + shadow_offset, y + length + shadow_offset)
        painter.drawLine(x + shadow_offset, y + length + shadow_offset, x - 12 + shadow_offset, y + length - 18 + shadow_offset)
        painter.drawLine(x + shadow_offset, y + length + shadow_offset, x + 12 + shadow_offset, y + length - 18 + shadow_offset)
    elif direction == "left":
        painter.drawLine(x + shadow_offset, y + shadow_offset, x - length + shadow_offset, y + shadow_offset)
        painter.drawLine(x - length + shadow_offset, y + shadow_offset, x - length + 18 + shadow_offset, y - 12 + shadow_offset)
        painter.drawLine(x - length + shadow_offset, y + shadow_offset, x - length + 18 + shadow_offset, y + 12 + shadow_offset)
    elif direction == "right":
        painter.drawLine(x + shadow_offset, y + shadow_offset, x + length + shadow_offset, y + shadow_offset)
        painter.drawLine(x + length + shadow_offset, y + shadow_offset, x + length - 18 + shadow_offset, y - 12 + shadow_offset)
        painter.drawLine(x + length + shadow_offset, y + shadow_offset, x + length - 18 + shadow_offset, y + 12 + shadow_offset)
    
    # Draw main arrow
    painter.setOpacity(1.0)
    painter.setPen(pen)
    
    if direction == "up":
        painter.drawLine(x, y, x, y - length)
        painter.drawLine(x, y - length, x - 12, y - length + 18)
        painter.drawLine(x, y - length, x + 12, y - length + 18)
    elif direction == "down":
        painter.drawLine(x, y, x, y + length)
        painter.drawLine(x, y + length, x - 12, y + length - 18)
        painter.drawLine(x, y + length, x + 12, y + length - 18)
    elif direction == "left":
        painter.drawLine(x, y, x - length, y)
        painter.drawLine(x - length, y, x - length + 18, y - 12)
        painter.drawLine(x - length, y, x - length + 18, y + 12)
    elif direction == "right":
        painter.drawLine(x, y, x + length, y)
        painter.drawLine(x + length, y, x + length - 18, y - 12)
        painter.drawLine(x + length, y, x + length - 18, y + 12)


def draw_rect(painter, params):
    """Draw modern rectangle with anti-aliasing, shadows, and rounded corners"""
    painter.setRenderHint(QtGui.QPainter.Antialiasing)
    
    x, y = params["position"]
    w, h = params["size"]
    border_color = params.get("border_color", COLORS["primary"])  # Default to primary blue
    border_thickness = params.get("border_thickness", 3)
    fill_color = params.get("fill_color", COLORS["primary"])
    fill_opacity = params.get("fill_opacity", 0.1)
    corner_radius = params.get("corner_radius", 12)
    
    rect = QtCore.QRectF(x, y, w, h)
    
    # Draw shadow
    shadow_offset = 3
    shadow_rect = rect.translated(shadow_offset, shadow_offset)
    painter.setOpacity(0.15)
    painter.setPen(QtCore.Qt.NoPen)
    painter.setBrush(QtGui.QColor(0, 0, 0))
    painter.drawRoundedRect(shadow_rect, corner_radius, corner_radius)
    
    # Fill
    if fill_opacity > 0:
        fill_brush = QtGui.QBrush(QtGui.QColor(fill_color))
        painter.setBrush(fill_brush)
        painter.setOpacity(fill_opacity)
    else:
        painter.setBrush(QtCore.Qt.NoBrush)
        painter.setOpacity(1.0)
    
    # Border with rounded ends
    pen = QtGui.QPen(QtGui.QColor(border_color), border_thickness, QtCore.Qt.SolidLine, QtCore.Qt.RoundCap, QtCore.Qt.RoundJoin)
    painter.setPen(pen)
    
    # Draw rectangle with rounded corners
    painter.drawRoundedRect(rect, corner_radius, corner_radius)
    
    painter.setOpacity(1.0)


DRAW_FUNCTIONS = {
    "text": draw_text,
    "arrow": draw_arrow,
    "rect": draw_rect,
}


# ======================================================================
# ---------------- CLICK-THROUGH OVERLAY WINDOW -------------------------
# ======================================================================

class ClickThroughOverlay(QtWidgets.QWidget):
    def __init__(self, steps):
        super().__init__()
        self.steps = steps
        self.current_step = 0

        self.setWindowFlags(
            QtCore.Qt.FramelessWindowHint |
            QtCore.Qt.WindowStaysOnTopHint |
            QtCore.Qt.Tool |
            QtCore.Qt.WindowTransparentForInput
        )
        self.setAttribute(QtCore.Qt.WA_TranslucentBackground)

        screen = QtWidgets.QApplication.primaryScreen().geometry()
        self.setGeometry(screen)

        QtWidgets.QShortcut(QtGui.QKeySequence("Escape"), self, activated=self.close_all)

    def close_all(self):
        QtWidgets.QApplication.quit()

    def paintEvent(self, event):
        painter = QtGui.QPainter(self)
        painter.setRenderHint(QtGui.QPainter.Antialiasing)
        painter.setRenderHint(QtGui.QPainter.TextAntialiasing)
        painter.setRenderHint(QtGui.QPainter.SmoothPixmapTransform)
        
        painter.setOpacity(0)
        painter.fillRect(self.rect(), QtGui.QColor(0, 0, 0))

        step = self.steps[self.current_step]
        for item in step["items"]:
            DRAW_FUNCTIONS[item["type"]](painter, item["params"])

    def next_step(self):
        if self.current_step < len(self.steps) - 1:
            self.current_step += 1
            self.update()
        else:
            QtWidgets.QApplication.quit()


# ======================================================================
# ---------------- CONTROL BUTTONS WINDOW -------------------------------
# ======================================================================

class ControlWindow(QtWidgets.QWidget):
    def __init__(self, overlay):
        super().__init__()
        self.overlay = overlay

        self.setWindowFlags(
            QtCore.Qt.FramelessWindowHint |
            QtCore.Qt.Tool |
            QtCore.Qt.WindowStaysOnTopHint
        )
        self.setAttribute(QtCore.Qt.WA_TranslucentBackground)

        # Modern design with larger size for step counter
        width = 300
        height = 90

        screen = QtWidgets.QApplication.primaryScreen().geometry()
        self.setGeometry(screen.width() - width - 30, screen.height() - height - 30, width, height)

        # Step counter label
        self.step_label = QtWidgets.QLabel(self)
        self.step_label.setGeometry(10, 10, 280, 25)
        self.step_label.setAlignment(QtCore.Qt.AlignCenter)
        self.step_label.setStyleSheet("""
            background-color: transparent;
            color: #5C5C5C;
            font-size: 13px;
            font-family: 'Segoe UI';
            font-weight: 500;
        """)
        self.update_step_label()

        # Next button
        self.next_button = QtWidgets.QPushButton("NEXT", self)
        self.next_button.setGeometry(10, 40, 130, 45)
        self.next_button.setStyleSheet("""
            QPushButton {
                background-color: #0078D4;
                color: white;
                font-size: 15px;
                font-weight: 600;
                font-family: 'Segoe UI';
                border: none;
                border-radius: 8px;
                padding: 8px 16px;
            }
            QPushButton:hover {
                background-color: #0066B8;
            }
            QPushButton:pressed {
                background-color: #005A9E;
            }
        """)
        self.next_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.next_button.clicked.connect(self.on_next)

        # Exit button
        self.exit_button = QtWidgets.QPushButton("EXIT", self)
        self.exit_button.setGeometry(150, 40, 140, 45)
        self.exit_button.setStyleSheet("""
            QPushButton {
                background-color: #5C5C5C;
                color: white;
                font-size: 15px;
                font-weight: 600;
                font-family: 'Segoe UI';
                border: none;
                border-radius: 8px;
                padding: 8px 16px;
            }
            QPushButton:hover {
                background-color: #EF4444;
            }
            QPushButton:pressed {
                background-color: #DC2626;
            }
        """)
        self.exit_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.exit_button.clicked.connect(QtWidgets.QApplication.quit)

    def update_step_label(self):
        """Update the step counter label"""
        current = self.overlay.current_step + 1
        total = len(self.overlay.steps)
        self.step_label.setText(f"Step {current} of {total}")

    def paintEvent(self, event):
        """Draw rounded background with shadow for the control window"""
        painter = QtGui.QPainter(self)
        painter.setRenderHint(QtGui.QPainter.Antialiasing)

        # Draw shadow
        shadow_rect = QtCore.QRectF(5, 5, self.width() - 5, self.height() - 5)
        painter.setOpacity(0.3)
        painter.setPen(QtCore.Qt.NoPen)
        painter.setBrush(QtGui.QColor(0, 0, 0))
        painter.drawRoundedRect(shadow_rect, 12, 12)

        # Draw background
        bg_rect = QtCore.QRectF(0, 0, self.width() - 5, self.height() - 5)
        painter.setOpacity(0.98)
        painter.setBrush(QtGui.QColor(COLORS["text_light"]))
        painter.drawRoundedRect(bg_rect, 12, 12)

    def refresh_button_label(self):
        """Update button text and step counter"""
        self.update_step_label()
        
        if self.overlay.current_step == len(self.overlay.steps) - 1:
            self.next_button.setText("FINISH")
        else:
            self.next_button.setText("NEXT")

    def on_next(self):
        if self.overlay.current_step == len(self.overlay.steps) - 1:
            QtWidgets.QApplication.quit()
            return

        self.overlay.next_step()
        self.refresh_button_label()


# ======================================================================
# ---------------- AUTO-ADVANCE ENGINE ---------------------------------
# ======================================================================

class AutoAdvanceEngine(QtCore.QObject):
    advance_step = QtCore.pyqtSignal()

    def __init__(self, overlay, controls, steps):
        super().__init__()
        self.overlay = overlay
        self.controls = controls
        self.steps = steps
        self.text_buffer = ""

        self.advance_step.connect(self.on_advance_step)

        self.mouse_listener = mouse.Listener(on_click=self.on_click)
        self.keyboard_listener = keyboard.Listener(on_press=self.on_key_press)

        self.mouse_listener.start()
        self.keyboard_listener.start()

    def current_action(self):
        step = self.steps[self.overlay.current_step]
        return step.get("action")

    # ---------- helpers ----------

    @staticmethod
    def point_in_region(x, y, region, padding=20):
        rx, ry, rw, rh = region
        return (
            rx - padding <= x <= rx + rw + padding and
            ry - padding <= y <= ry + rh + padding
        )

    # ---------- Qt thread slot ----------

    def on_advance_step(self):
        self.text_buffer = ""
        self.overlay.next_step()
        self.controls.refresh_button_label()

    # ---------- mouse handler ----------

    def on_click(self, x, y, button, pressed):
        if not pressed:
            return

        action = self.current_action()
        if not action:
            return

        atype = action.get("type")

        if atype == "click":
            region = action.get("region")
            padding = action.get("padding", 20)
            if region and self.point_in_region(x, y, region, padding):
                self.advance_step.emit()

        elif atype == "any":
            for opt in action.get("options", []):
                if opt.get("type") == "click":
                    region = opt.get("region")
                    padding = opt.get("padding", 20)
                    if region and self.point_in_region(x, y, region, padding):
                        self.advance_step.emit()
                        break

    # ---------- keyboard handler ----------

    def on_key_press(self, key):
        action = self.current_action()
        if not action:
            return

        atype = action.get("type")

        # We only care about typing for type / any-type actions
        if atype not in ("type", "any"):
            return

        # Decode key to text
        ch = None
        try:
            if hasattr(key, "char") and key.char is not None:
                ch = key.char
            elif key == keyboard.Key.space:
                ch = " "
            elif key == keyboard.Key.backspace:
                # trim buffer
                self.text_buffer = self.text_buffer[:-1]
                ch = None
        except Exception:
            ch = None

        if ch:
            self.text_buffer += ch

        buffer_lower = self.text_buffer.lower()

        # Pure type step
        if atype == "type":
            target = action.get("text", "").lower()
            if target and buffer_lower.endswith(target):
                self.advance_step.emit()

        # any: maybe there is a type option
        elif atype == "any":
            for opt in action.get("options", []):
                if opt.get("type") == "type":
                    target = opt.get("text", "").lower()
                    if target and buffer_lower.endswith(target):
                        self.advance_step.emit()
                        break


# ======================================================================
# ---------------- MAIN ------------------------------------------------
# ======================================================================

def main():
    if len(sys.argv) < 2:
        print("Usage: python overlay_guide.py path/to/steps.json")
        sys.exit(1)

    steps_path = sys.argv[1]
    steps = load_steps_from_json(steps_path)

    app = QtWidgets.QApplication(sys.argv)

    overlay = ClickThroughOverlay(steps)
    overlay.show()

    controls = ControlWindow(overlay)
    controls.show()

    engine = AutoAdvanceEngine(overlay, controls, steps)

    sys.exit(app.exec_())


if __name__ == "__main__":
    main()