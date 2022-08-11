import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { verifyHandler } from '../../helpers/handlers'

import config from '../../main.config'
import i18n from '../../i18n'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const title = i18n['auth']['verify']['title'][locale]
    const description = i18n['auth']['verify']['description'][locale]

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

    return (
        <Layout
            config={config}
            i18n={i18n}
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Input
                        width="220pt"
                        mr={0.5}
                        placeholder="Input your verification code"
                        type="secondary"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.trim())
                        }}
                    />
                    <Button
                        loading={loading}
                        disabled={!refCode.current}
                        scale={0.7}
                        type="secondary"
                        onClick={(e) =>
                            verifyHandler(
                                config,
                                setLoading,
                                setToast,
                                router,
                                refCode
                            )
                        }
                    >
                        <b>SUBMIT</b>
                    </Button>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
