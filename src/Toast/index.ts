import { ToastDefaultProps } from './props'

Component({
    props: ToastDefaultProps,
    data: {
        show: false,
    },
    timer: null,
    didUpdate (prev) {
        if (!prev.visible && this.props.visible) {
            this.handleShowToast()
        } else if (!this.props.visible && this.data.show) {
            this.closeMask()
        }
    },
    didMount () {
        if (this.props.visible) {
            this.handleShowToast()
        }
    },
    methods: {
        closeMask () {
            this.setData({ show: false })
            clearInterval(this.timer)
            this.props.onClose?.()
        },
        handleShowToast () {
            this.setData({ show: true })
            if (this.props.duration > 0) {
                this.timer = setTimeout(() => {
                    this.closeMask()
                }, this.props.duration)
            }
        },
        handleClickMask () {
            if (this.props.showMask && this.props.maskCloseable) {
                this.closeMask()
            }
        }
    }
})